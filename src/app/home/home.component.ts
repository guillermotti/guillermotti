import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isDark: boolean;
  textButton: string;

  constructor() {
    this.isDark = localStorage.getItem('isDark') === 'true';
    this.textButton = localStorage.getItem('isDark') === 'true' ? 'Dude, turn lights on' : 'Heck, bring me dark';
  }

  ngOnInit(): void {
  }

  networks = [
    { "href": "https://github.com/guillermotti", "width": "25", "height": "24", "d": "M12.5.42a12.08 12.08 0 00-3.82 23.54c.6.11.83-.25.83-.57l-.02-2.25c-3.03.56-3.82-.74-4.06-1.42-.14-.35-.72-1.42-1.24-1.7-.42-.23-1.02-.8-.01-.8.95-.02 1.63.87 1.86 1.23 1.08 1.83 2.82 1.31 3.51 1 .11-.79.43-1.32.77-1.62-2.68-.3-5.5-1.34-5.5-5.96 0-1.32.47-2.4 1.25-3.25-.13-.3-.55-1.54.12-3.2 0 0 1-.32 3.32 1.24a11.21 11.21 0 016.04 0c2.31-1.58 3.32-1.24 3.32-1.24.67 1.66.25 2.9.12 3.2a4.68 4.68 0 011.24 3.25c0 4.63-2.82 5.66-5.5 5.96.43.38.8 1.1.8 2.24v3.32c0 .32.22.7.82.57A12.1 12.1 0 0012.5.42z" },
    { "href": "https://www.linkedin.com/in/guillermotti/", "width": "24", "height": "23", "d": "M5.39 3.04a2.42 2.42 0 11-4.84 0 2.42 2.42 0 014.84 0zm.07 4.2H.62v15.13h4.84V7.26zm7.63 0H8.3v15.14h4.76v-7.94c0-4.43 5.76-4.84 5.76 0v7.94h4.77v-9.59c0-7.45-8.53-7.17-10.53-3.51l.04-2.03z" },
  ];
  certifications = [
    { "name": "CNCF Kubestronaut", "description": "All Kubernetes Certifications", "date": "December, 2022", "badge": "https://www.credly.com/badges/c87632d0-62e9-44fa-99d7-79ea7d14c94b", "src": "../assets/kubestronaut.png" },
    { "name": "CKS", "description": "Certified Kubernetes Security Specialist", "date": "December, 2022", "badge": "https://www.credly.com/badges/03cab718-7fd5-4999-a065-c22715eb1a5a", "src": "../assets/cks.png" },
    { "name": "Linux Foundation", "description": "IT - Associate", "date": "November, 2022", "badge": "https://www.credly.com/badges/3bf111e7-82c9-4d2b-aea5-89c269047154", "src": "../assets/linux-it-associate.png" },
    { "name": "AWS", "description": "Certified Developer - Associate", "date": "March, 2022", "badge": "https://www.credly.com/badges/8ffae0c0-0718-41f6-b7f7-10a71f6f3438", "src": "../assets/aws-developer.png" },
    { "name": "AWS", "description": "Certified SysOps Administrator - Associate", "date": "January, 2022", "badge": "https://www.credly.com/badges/e6bba1a5-82e5-4887-9583-6a6ae1911301", "src": "../assets/aws-sysops.png" },
    { "name": "AWS", "description": "Certified Solutions Architect - Associate", "date": "January, 2022", "badge": "https://www.credly.com/badges/a16f19d6-ea33-4cfc-b54d-299709f5cd3e", "src": "../assets/aws-architect.png" },
    { "name": "AWS", "description": "Certified Cloud Practitioner", "date": "December, 2021", "badge": "https://www.credly.com/badges/fe0918ae-3c2a-42b3-95d8-d9fb06b0f00a", "src": "../assets/aws-practitioner.png" },
    { "name": "KCNA", "description": "Kubernetes and Cloud Native Associate", "date": "December, 2021", "badge": "https://www.credly.com/badges/a7e8cfd5-01f5-44e2-b2d5-c00566a708d2", "src": "../assets/kcna.png" },
    { "name": "CKA", "description": "Certified Kubernetes Administrator", "date": "July, 2021", "badge": "https://www.credly.com/badges/a8737608-a450-4bcd-b1e5-e94a392094d8", "src": "../assets/cka.png"},
    { "name": "HashiCorp", "description": "Certified Terraform Associate", "date": "April, 2021", "badge": "https://www.credly.com/badges/4c8601e9-4215-4bbd-853a-61d73c665102", "src": "../assets/terraform.png"},
    { "name": "CKAD", "description": "Certified Kubernetes Application Developer", "date": "April, 2021", "badge": "https://www.credly.com/badges/b82f1e41-6e19-49ec-831b-6068dd6da480", "src": "../assets/ckad.png" },
  ]
  posts = [
    { "title": "Git for everyone", "description": "Introduction to git", "href": "https://medium.com/empathyco/git-for-everyone-8bf7e9efc254" },
    { "title": "Documentation As Code", "description": "Docusaurus and MDX", "href": "https://medium.com/empathyco/documentation-as-code-10e83b02a3a5" },
    { "title": "Guide to optimise user management", "description": "Integrating Personio, GitHub & Google Workspace", "href": "https://engineering.empathy.co/personio-github-googleworkspace/" },
    { "title": "ElasticSearch Data Migration in Kubernetes", "description": "Management of ElasticSearch clusters", "href": "https://engineering.empathy.co/elasticsearch-data-migration-within-k8s/" },
    { "title": "Distributed Load Testing with K6", "description": "K6 running in Kubernetes with Argo Workflows", "href": "https://engineering.empathy.co/distributed-load-testing-with-k6/" },
  ]
  talks = [
    { "event": "CLOUD NATIVE ASTURIAS", "title": "How to manage GitHub organizations with Terraform", "date": "May, 2021", "href": "https://www.youtube.com/watch?v=J2vGGGa4Y20" },
    { "event": "KUBERNETES COMMUNITY DAYS GUATEMALA", "title": "GitHub Actions self-hosting runners in k8s", "date": "Nov, 2021", "href": "https://www.youtube.com/watch?v=eNrbfLPqxBM" },
    { "event": "KUBERNETES COMMUNITY DAYS MUNICH", "title": "Make Load Testing Dev-Friendly Again! When K6 Meets Argo", "date": "Oct, 2022", "href": "https://community.cncf.io/events/details/cncf-kcd-munich-presents-kubernetes-community-days-munich-2022-1/" },
    { "event": "KUBERNETES COMMUNITY DAYS MUNICH", "title": "Building the best internal developers' portal with Backstage", "date": "Oct, 2022", "href": "https://community.cncf.io/events/details/cncf-kcd-munich-presents-kubernetes-community-days-munich-2022-1/" },
    { "event": "CLOUD NATIVE REJEKTS", "title": "Building the best internal developers' portal with Backstage", "date": "Oct, 2022", "href": "https://youtu.be/pHe_ePq83zc?t=14465" },
    { "event": "KUBERNETES COMMUNITY DAYS SPAIN", "title": "K8s Happiness: From Kustomize to Helm", "date": "Nov, 2022", "href": "https://www.youtube.com/watch?v=CbAju2FUp40" },
  ]
  projects = [
    { "name": "CMMSE", "href": "https://cmmse-app.firebaseapp.com" },
    { "name": "feta.es", "href": "https://feta.es" },
    { "name": "canoserigrafia.com", "href": "https://canoserigrafia.com" },
    { "name": "Storeos", "href": "https://github.com/store-os" },
    { "name": "Listi", "href": "https://github.com/listiapp" },
    { "name": "Resizes", "href": "https://resiz.es" },
  ]

  changeMode() {
    this.isDark = !this.isDark;
    this.textButton = this.textButton.includes('Heck') ? 'Dude, turn lights on' : 'Heck, bring me dark';
    localStorage.setItem('isDark', this.isDark.toString());
  }

}
