---
title: Policy & governance in Kubernetes
description: Initial steps to secure a Kubernetes cluster using OPA/Gatekeeper. 🔑
publish: true
image: '/assets/images/opa.png'
tags: [Security, OPA, Gatekeeper, Kubernetes]
date: April 19th 2022
---

Kubernetes is a complex tool. Managing a cluster becomes more and more difficult when you grow as cluster maintainer. Probably you are maintaining more than one cluster so the task is even more tedious.

You might include tools for diverse purposes like CI/CD, monitoring and logging stacks, microservices and many other pieces. As the cluster grows in size, the risk to leave a door open to an atacker is bigger each day.

A well known natural step to secure the cluster and avoid certain undesired actions is applying policies and governance to the cluster.

There are several tools to integrate policies within a Kubernetes cluster. Before upgrading to version 1.21, there was a way to implement the governance with an internal kubernetes resource, the `PodSecurityPolicy`, but this resource [is being deprecated](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future/). For that reason another tools became popular, as it's also explained in the previous link, [K-Rail](https://github.com/cruise-automation/k-rail), [Kyverno](https://github.com/kyverno/kyverno/) and [OPA/Gatekeeper](https://github.com/open-policy-agent/gatekeeper/) are the most known options.

After researching these alternatives, I think that the power of OPA is bigger than the others. OPA is not only attached to Kubernetes and can be used for validating policies in any other system where you provide a status with an input file (JSON for example) and then OPA will validate those policies to verify the input satisfies them. If that's the case, you are able to perform the following actions, otherwise you shouldn't continue.

There is a [wonderful repository](https://github.com/anderseknert/awesome-opa) containing great resources about OPA and its maintainer, [Anders](https://twitter.com/anderseknert), is adding more and more resources each day.

There are several ways to integrate OPA in kubernetes as the [OPA documentation](https://www.openpolicyagent.org/docs/latest/kubernetes-introduction/) points to. 

- [Plain OPA + Kube-mgmt](https://www.openpolicyagent.org/docs/latest/kubernetes-introduction/#how-does-it-work-with-plain-opa-and-kube-mgmt)
	- [MagTape](https://github.com/tmobile/magtape) is an example of this integration that can be installed aswell.
- [OPA/Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/)
	- The first version of Gatekeeper (**v1.0**) also was using **kube-mgmt**.
	- The current version is **v3.7.0** which is the one I'm referring to.

## OPA/Gatekeeper installation

To integrate OPA within kubernetes, you must install [Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/install/) first.

I find the Helm chart as the best way to install it. And with the default `values.yaml` you can deploy Gatekeeper easily in your cluster.

```sh
k get po                                                                          
NAME                                         READY   STATUS    RESTARTS   AGE
gatekeeper-audit-8cf949-297k8                1/1     Running   0          123m
gatekeeper-controller-manager-7f7c46-4l9gp   1/1     Running   0          5h39m
gatekeeper-controller-manager-7f7c46-7xntv   1/1     Running   0          29h
gatekeeper-controller-manager-7f7c46-8phzn   1/1     Running   0          29h
```

By default 3 replicas of the controller manager and 1 replica of the audit container will be deployed.

## ConstraintTemplates & Constraints

Now that Gatekeeper is running, we can define a **ConstraintTemplate** with an OPA policy written in Rego:

```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8shttpsonly
  annotations:
    description: >-
      Requires Ingress resources to be HTTPS only.

      Ingress resources must:
      - include a valid TLS configuration
      - include the `kubernetes.io/ingress.allow-http` annotation, set to
        `false`.

      https://kubernetes.io/docs/concepts/services-networking/ingress/#tls
spec:
  crd:
    spec:
      names:
        kind: K8sHttpsOnly
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8shttpsonly

        violation[{"msg": msg}] {
          input.review.object.kind == "Ingress"
          re_match("^(extensions|networking.k8s.io)/", input.review.object.apiVersion)
          ingress := input.review.object
          not https_complete(ingress)
          msg := sprintf("Ingress should be https. tls configuration and allow-http=false annotation are required for %v", [ingress.metadata.name])
        }

        https_complete(ingress) = true {
          ingress.spec["tls"]
          count(ingress.spec.tls) > 0
          ingress.metadata.annotations["kubernetes.io/ingress.allow-http"] == "false"
        }
```

The template contains the OPA policy but before verifying the policy is being violated, you should create also at least one **Constraint** from the **ConstraintTemplate**:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sHttpsOnly
metadata:
  name: ingress-https-only
spec:
  match:
    kinds:
      - apiGroups: ["extensions", "networking.k8s.io"]
        kinds: ["Ingress"]
```

Once both ContraintTemplate and **Constraint** are applied into the cluster, you can audit the policy with the status of the **Constraint**, so just run:

```sh
k get k8shttpsonly.constraints.gatekeeper.sh/https-only -o yaml
```

Validate there are no violations with the `status` field:

```yaml
status:
  auditTimestamp: "2022-04-19T17:12:19Z"
  byPod:
  - constraintUID: 119f00ec-9e2b-4119-990f-8dfbbf16ecfb
    enforced: true
    id: gatekeeper-audit-8cf899949-297k8
    observedGeneration: 1
    operations:
    - audit
    - mutation-status
    - status
  - constraintUID: 119f00ec-9e2b-4119-990f-8dfbbf16ecfb
    enforced: true
    id: gatekeeper-controller-manager-7f7b97c46-4l9gp
    observedGeneration: 1
    operations:
    - mutation-webhook
    - webhook
  - constraintUID: 119f00ec-9e2b-4119-990f-8dfbbf16ecfb
    enforced: true
    id: gatekeeper-controller-manager-7f7b97c46-7xntv
    observedGeneration: 1
    operations:
    - mutation-webhook
    - webhook
  - constraintUID: 119f00ec-9e2b-4119-990f-8dfbbf16ecfb
    enforced: true
    id: gatekeeper-controller-manager-7f7b97c46-8phzn
    observedGeneration: 1
    operations:
    - mutation-webhook
    - webhook
  totalViolations: 0
```

## enforcementAction

Before applying any policy and restrict the resources from violations you can set within the **Constraint** the property `spec.enforcementAction: dryrun` so the audit will show you if the policy has been violated but the controller won't prevent to apply or create any resource. This is very useful to audit the current status of a cluster when you are integrating Gatekeeper for the first time.

By default, the **Constraint** property is set as `spec.enforcementAction: deny` so the policy will prevent to apply those resources to the kubernetes api-server.

## Caveats

By default Gatekeeper if is down there are no validations for the policies so any resource can't be validated. There is a way to enforce the policies even Gatekeeper is down but it's not recommended and can be tricky to resolve the problem. Important reads:

- https://open-policy-agent.github.io/gatekeeper/website/docs/#admission-webhook-fail-open-by-default
- https://open-policy-agent.github.io/gatekeeper/website/docs/failing-closed/

## Conclusion

OPA is very powerful and Gatekeeper integrates OPA functionality really well into kubernetes. The most useful policies are already created and available in [this repo](https://github.com/open-policy-agent/gatekeeper-library/tree/master/library) so probably you just need to copy and paste the **ConstraintTemplates** and **Constraints** to the cluster modifying a bit the **Constraint** to apply to your needs but you won't need to modify the Rego code in the policy.

The worst thing related to OPA is Rego which could be tricky and the learning curve is quite long. Anyway, there is a [playground](https://play.openpolicyagent.org/) where you can play with Rego and it's very cool!

## References

- https://www.openpolicyagent.org/
- https://github.com/open-policy-agent/gatekeeper/
- https://play.openpolicyagent.org
- https://www.openpolicyagent.org/docs/latest/policy-language/
- https://arapulido.github.io/blog/2021/08/02/testing-your-kubernetes-config-against-policy-ci/
- https://aws.amazon.com/blogs/containers/policy-based-countermeasures-for-kubernetes-part-1/
- https://kubernetes.io/blog/2019/08/06/opa-gatekeeper-policy-and-governance-for-kubernetes/
- https://neonmirrors.net/post/2021-02/kubernetes-policy-comparison-opa-gatekeeper-vs-kyverno/
- https://www.openpolicyagent.org/docs/latest/kubernetes-primer/
- https://open-policy-agent.github.io/gatekeeper/website/docs/library/
- https://github.com/open-policy-agent/gatekeeper-library/tree/master/library/general
- https://github.com/anderseknert/awesome-opa#kubernetes
- https://techblost.com/integrating-open-policy-agent-opa-with-kubernetes/
- https://aws.amazon.com/blogs/opensource/using-open-policy-agent-on-amazon-eks/
- https://dustinspecker.com/posts/open-policy-agent-konstraint/
- https://github.com/plexsystems/konstraint
- https://medium.com/@LachlanEvenson/testing-gatekeeper-constraints-with-gator-cli-da31050a6564