---
title: Introduction to Dagger
description: First research into Dagger and how it works. 🧪
publish: true
image: '/assets/images/dagger.svg'
tags: [CI/CD, dagger]
date: April 8th 2022
---

The last week Dagger, from Docker creators, was [released publicly](https://dagger.io/blog/public-launch-announcement). Dagger is an open source solution for CI/CD pipelines which introduces a new way to make those pipelines portable to any system as Docker already did years ago with containers.

Going on the research of what Dagger could bring, I started reading its [docs](https://docs.dagger.io) and trying to understand the advantages of its usage.

The first standard of Dagger is the ability to run CI/CD pipelines in your local machine as it would be running as part of your CI/CD tool like Jenkins, GitHub Actions, GitLab CI, CircleCI or others.

So let's try Dagger. It looks promising!

# Prerequisites

You must install Docker and have it running. If you don't have it installed yet, check the [docs](https://www.docker.com/products/docker-desktop) to install it.

# Running Dagger pipelines in local

To start you should install the CLI. I'm using macOS so I can install it using [Homebrew](https://brew.sh/):

```sh
brew install dagger/tap/dagger
```

> Check [the docs](https://docs.dagger.io/1200/local-dev) if you need to install the CLI in other OS.

You can check if the installation was finished successfully running:

```sh
dagger version
```

After checking the installation is correct, let's run the first example cloning the [GitHub repository](https://github.com/guillermotti/awesome-dagger) I created:

```sh
git clone https://github.com/guillermotti/awesome-dagger  
cd awesome-dagger/examples/react
dagger project init
dagger project update
dagger do build
```

After some minutes the CI/CD pipeline should be done locally and a `_build` folder is created. Open the file `_build/index.html` in your browser and check the result. This is possible because is a static application.

Edit the file `src/components/Form.js` on line **25** for any other value you like and run again:

```sh
dagger do build
```

This time the pipeline will be faster as most of the contet will be cached. The result will be available also opening `_build/index.html`.


# Running Dagger pipelines within GitHub Actions

Now that we already executed the pipeline locally, its time to run the pipeline within a CI environment like GitHub Actions.

Take a look to `.github/workflows/react.yml` and check that there are just 3 steps in the pipeline:

```yaml
steps:
  - name: Clone repository
    uses: actions/checkout@v2

  - name: Dagger install 
    uses: dagger/dagger-for-github@v2
    # See all options at https://github.com/dagger/dagger-for-github
    with:
      install-only: true

  - name: Dagger run
    run: |
      cd examples/react
      dagger project init
      dagger project update
      dagger do build
```

In fact, we are just running the `dagger do build` that we already run locally but within the GitHub Action. And it works!

If we would like to deploy the static application in Netlify we just have to change `dagger do build` to `dagger do deploy`:

```yaml
steps:
  - name: Clone repository
    uses: actions/checkout@v2

  - name: Dagger install 
    uses: dagger/dagger-for-github@v2
    # See all options at https://github.com/dagger/dagger-for-github
    with:
      install-only: true

  - name: Dagger run
    run: |
      cd examples/react
      dagger project init
      dagger project update
      dagger do deploy
```

And add as environment variables in the GitHub Action `.github/workflows/react.yml` the following:

```yaml
env:  
  # This needs to be unique across all of netlify.app  
  APP_NAME: react-dagger-europa  
  NETLIFY_TEAM: dagger  
  # Get one from https://app.netlify.com/user/applications/personal  
  NETLIFY_TOKEN: ${{ secrets.NETLIFY_TOKEN }}  
  # GitHub Actions friendly logs  
  DAGGER_LOG_FORMAT: plain
```

This also works because the `examples/react/react.cue` file is ready to receive those environment variables and already contains a `deploy` action:

```cue
deploy: netlify.#Deploy & {
	contents: build.contents.output
	site: client.env.APP_NAME
	token: client.env.NETLIFY_TOKEN
	team: client.env.NETLIFY_TEAM
}
```

To deploy from local, set those environment variables and then you can also run:

```sh
dagger do deploy
```

The Dagger pipeline could be ran also in another CI environment like **GitLab CI** or **Jenkins**. Take a look to the [docs](https://docs.dagger.io/1201/ci-environment) to check out more examples.

# Caveats

One of the problems I see is that we should learn at least the basics of [CUE](https://cuelang.org/) which seems quite easy. In my case, it's my first time reading this language and I'm comfortable with it. CUE also has a [playground](https://cuelang.org/play/?id=qXGPCDqQdtp#cue@export@yaml) to test the language which is very useful.

Also there are limited packages available on the ["universe" of Dagger](https://github.com/dagger/dagger/tree/main/pkg/universe.dagger.io), and there aren't almost any examples available yet. I guess more and more packages will be availabe pretty soon.


# Conclusion

Dagger is really cool! As we checked before it's very easy to implement and the pipelines are ready to be executed without any change between **local** and **CI environments**. 

It reminds me to Kubernetes in the **agnosticism**. Kubernetes is agnostic to run containers in the same way regardless of the cloud provider or infrastructure. Dagger is agnostic to run CI/CD pipelines because you are able to run it locally, within GitHub Actions or any other CI environment of your choice.

It's also important to remember that Dagger won't replace any CI environment. Dagger will enrich the CI/CD pipelines adding a **portable development layer** on top of it.

Meanwhile Dagger docs keep evolving, I will continue researching more in deep the benefits and trying to build more examples which I will add to the repository. As the pipelines are reusable, the repo should be like a library of pipelines in the future. Don't hesitate to create a PR and add your own pipelines!