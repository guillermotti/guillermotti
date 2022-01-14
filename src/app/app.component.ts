import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark = false;
  textButton = 'Heck, bring me dark';
  networks = [
    { "href": "https://github.com/guillermotti", "width": "25", "height": "24", "d": "M12.5.42a12.08 12.08 0 00-3.82 23.54c.6.11.83-.25.83-.57l-.02-2.25c-3.03.56-3.82-.74-4.06-1.42-.14-.35-.72-1.42-1.24-1.7-.42-.23-1.02-.8-.01-.8.95-.02 1.63.87 1.86 1.23 1.08 1.83 2.82 1.31 3.51 1 .11-.79.43-1.32.77-1.62-2.68-.3-5.5-1.34-5.5-5.96 0-1.32.47-2.4 1.25-3.25-.13-.3-.55-1.54.12-3.2 0 0 1-.32 3.32 1.24a11.21 11.21 0 016.04 0c2.31-1.58 3.32-1.24 3.32-1.24.67 1.66.25 2.9.12 3.2a4.68 4.68 0 011.24 3.25c0 4.63-2.82 5.66-5.5 5.96.43.38.8 1.1.8 2.24v3.32c0 .32.22.7.82.57A12.1 12.1 0 0012.5.42z" },
    { "href": "https://www.linkedin.com/in/guillermotti/", "width": "24", "height": "23", "d": "M5.39 3.04a2.42 2.42 0 11-4.84 0 2.42 2.42 0 014.84 0zm.07 4.2H.62v15.13h4.84V7.26zm7.63 0H8.3v15.14h4.76v-7.94c0-4.43 5.76-4.84 5.76 0v7.94h4.77v-9.59c0-7.45-8.53-7.17-10.53-3.51l.04-2.03z" },
    { "href": "https://twitter.com/guillermotti", "width": "25", "height": "21", "d": "M24.78 3.33c-.92.41-1.9.68-2.9.8a5.07 5.07 0 002.22-2.8c-1 .6-2.08 1-3.21 1.23a5.05 5.05 0 00-8.61 4.6A14.35 14.35 0 011.86 1.9a5.04 5.04 0 001.57 6.75A5.04 5.04 0 011.13 8v.07a5.06 5.06 0 004.06 4.95c-.74.2-1.52.23-2.28.09a5.06 5.06 0 004.72 3.5 10.14 10.14 0 01-7.48 2.1 14.3 14.3 0 007.74 2.27c9.3 0 14.38-7.7 14.38-14.38l-.01-.65c.99-.71 1.84-1.6 2.52-2.61z" }
  ];
  skills = [
    { "title": "Containers", "description": "Docker, Kubernetes, Rancher" },
    { "title": "Infrastructure As Code", "description": "Terraform, Serverless" },
    { "title": "GitOps", "description": "ArgoCD, Spinnaker, Harness" },
    { "title": "Cloud", "description": "AWS, GCP, Firebase" },
    { "title": "CI/CD", "description": "Jenkins, GitHub Actions, CircleCI, GitLabCI" },
    { "title": "Development", "description": "Node.js, Angular" },
    { "title": "Databases", "description": "ElasticSearch, MongoDB, PostgreSQL" }
  ];
  certifications = [
    { "name": "AWS", "description": "Certified SysOps Administrator - Associate", "date": "January, 2022", "badge": "https://www.credly.com/badges/e6bba1a5-82e5-4887-9583-6a6ae1911301", "src": "../assets/AWS-SysOps-Associate.png" },
    { "name": "AWS", "description": "Certified Solutions Architect - Associate", "date": "January, 2022", "badge": "https://www.credly.com/badges/a16f19d6-ea33-4cfc-b54d-299709f5cd3e", "src": "../assets/AWS-SolArchitect-Associate.png" },
    { "name": "AWS", "description": "Certified Cloud Practitioner", "date": "December, 2021", "badge": "https://www.credly.com/badges/fe0918ae-3c2a-42b3-95d8-d9fb06b0f00a", "src": "../assets/AWS-CloudPractitioner.png" },
    { "name": "KCNA", "description": "Kubernetes and Cloud Native Associate", "date": "December, 2021", "badge": "https://www.credly.com/badges/a7e8cfd5-01f5-44e2-b2d5-c00566a708d2", "d": "M.05 19.37L2.8 7.43c.14-.62.57-1.16 1.15-1.44L15.07.68a2.2 2.2 0 011.85 0l11.13 5.31c.57.28 1 .82 1.15 1.43l2.75 11.95c.14.61-.02 1.29-.41 1.78l-7.7 9.58c-.4.5-1.03.8-1.66.8H9.82c-.63 0-1.26-.3-1.66-.8l-7.7-9.58a2.08 2.08 0 01-.41-1.78zm15.37 1.1l-1.87 3.38a7.6 7.6 0 004.91 0l-1.87-3.39c-.34-.47-.91-.42-1.17 0zm-2.8-1.9l-3.8.64a7.63 7.63 0 003.07 3.83l1.47-3.56c.16-.53-.19-.97-.73-.92zm6.02.89l1.49 3.6a7.6 7.6 0 003.07-3.86l-3.84-.65c-.56-.06-.9.4-.72.9zm-3.97-3.15l.26 1.15 1.07.51 1.06-.5.27-1.16-.74-.92h-1.18l-.74.92zm5.2.01l3.74 1.07a7.84 7.84 0 00-1.12-4.79l-2.87 2.58c-.34.4-.32.88.26 1.14zm-7.5-1.13L9.49 12.6a7.6 7.6 0 00-1.07 4.8l3.7-1.06c.5-.2.67-.72.27-1.15zm5.82-1.8l3.15-2.23a7.66 7.66 0 00-4.42-2.13l.22 3.86c.09.65.58.75 1.05.5zm-7.56-2.23l3.17 2.24c.52.33 1.01-.02 1.06-.5l.22-3.87a7.67 7.67 0 00-4.45 2.13zm17.17 8.9c-.31-.1-1.3-.54-1.95-.64-.2-.01-.3.08-.4.16l-.32-.06a9.6 9.6 0 01-4.25 5.35l.12.3c-.05.12-.12.24-.06.43.28.67.7 1.2 1.05 1.76.67 1.11-.64 1.88-1.28.76-.25-.69-.46-1.54-.77-2.04-.1-.17-.25-.19-.37-.23l-.16-.28c-2.3.85-4.57.82-6.8-.02l-.17.3c-.12.04-.24.07-.32.16-.34.44-.63 1.65-.87 2.19-.51.98-1.78.3-1.33-.63.29-.6.67-.92 1.15-1.99a.57.57 0 00-.06-.42l.13-.32a9.6 9.6 0 01-4.25-5.3l-.32.05a.59.59 0 00-.42-.15c-.4.06-.84.11-1.29.38-2.05 1.22-2.8-1.4-.28-1.24.97.06 1.37-.08 1.64-.54l.3-.09a9.54 9.54 0 011.5-6.65l-.23-.21c-.01-.1-.03-.3-.15-.43-.93-.79-1.31-.79-1.86-1.25a.74.74 0 01.91-1.16c.5.4.79.9 1.65 1.55.17.1.3.06.43.04l.27.19a9.69 9.69 0 016.15-2.96l.02-.31c.1-.1.2-.23.23-.38.08-.76-.18-1.67-.18-2.25.02-1.06 1.44-1.12 1.48 0 .01.65-.2 1-.19 2.25.03.2.15.28.24.37l.02.33a9.66 9.66 0 016.12 2.95l.28-.2c.1 0 .3.04.45-.05.37-.23.92-.82 1.48-1.41.82-.85 2 .15 1.08 1.02-.46.4-1.04.55-1.87 1.26-.14.15-.13.29-.14.42l-.26.23a9.29 9.29 0 011.54 6.64l.3.08c.05.08.16.26.31.32.64.2 1.29.21 2.14.3 1.28.14.8 1.8-.44 1.42z" },
    { "name": "CKA", "description": "Certified Kubernetes Administrator", "date": "July, 2021", "badge": "https://www.credly.com/badges/a8737608-a450-4bcd-b1e5-e94a392094d8", "d": "M.05 19.37L2.8 7.43c.14-.62.57-1.16 1.15-1.44L15.07.68a2.2 2.2 0 011.85 0l11.13 5.31c.57.28 1 .82 1.15 1.43l2.75 11.95c.14.61-.02 1.29-.41 1.78l-7.7 9.58c-.4.5-1.03.8-1.66.8H9.82c-.63 0-1.26-.3-1.66-.8l-7.7-9.58a2.08 2.08 0 01-.41-1.78zm15.37 1.1l-1.87 3.38a7.6 7.6 0 004.91 0l-1.87-3.39c-.34-.47-.91-.42-1.17 0zm-2.8-1.9l-3.8.64a7.63 7.63 0 003.07 3.83l1.47-3.56c.16-.53-.19-.97-.73-.92zm6.02.89l1.49 3.6a7.6 7.6 0 003.07-3.86l-3.84-.65c-.56-.06-.9.4-.72.9zm-3.97-3.15l.26 1.15 1.07.51 1.06-.5.27-1.16-.74-.92h-1.18l-.74.92zm5.2.01l3.74 1.07a7.84 7.84 0 00-1.12-4.79l-2.87 2.58c-.34.4-.32.88.26 1.14zm-7.5-1.13L9.49 12.6a7.6 7.6 0 00-1.07 4.8l3.7-1.06c.5-.2.67-.72.27-1.15zm5.82-1.8l3.15-2.23a7.66 7.66 0 00-4.42-2.13l.22 3.86c.09.65.58.75 1.05.5zm-7.56-2.23l3.17 2.24c.52.33 1.01-.02 1.06-.5l.22-3.87a7.67 7.67 0 00-4.45 2.13zm17.17 8.9c-.31-.1-1.3-.54-1.95-.64-.2-.01-.3.08-.4.16l-.32-.06a9.6 9.6 0 01-4.25 5.35l.12.3c-.05.12-.12.24-.06.43.28.67.7 1.2 1.05 1.76.67 1.11-.64 1.88-1.28.76-.25-.69-.46-1.54-.77-2.04-.1-.17-.25-.19-.37-.23l-.16-.28c-2.3.85-4.57.82-6.8-.02l-.17.3c-.12.04-.24.07-.32.16-.34.44-.63 1.65-.87 2.19-.51.98-1.78.3-1.33-.63.29-.6.67-.92 1.15-1.99a.57.57 0 00-.06-.42l.13-.32a9.6 9.6 0 01-4.25-5.3l-.32.05a.59.59 0 00-.42-.15c-.4.06-.84.11-1.29.38-2.05 1.22-2.8-1.4-.28-1.24.97.06 1.37-.08 1.64-.54l.3-.09a9.54 9.54 0 011.5-6.65l-.23-.21c-.01-.1-.03-.3-.15-.43-.93-.79-1.31-.79-1.86-1.25a.74.74 0 01.91-1.16c.5.4.79.9 1.65 1.55.17.1.3.06.43.04l.27.19a9.69 9.69 0 016.15-2.96l.02-.31c.1-.1.2-.23.23-.38.08-.76-.18-1.67-.18-2.25.02-1.06 1.44-1.12 1.48 0 .01.65-.2 1-.19 2.25.03.2.15.28.24.37l.02.33a9.66 9.66 0 016.12 2.95l.28-.2c.1 0 .3.04.45-.05.37-.23.92-.82 1.48-1.41.82-.85 2 .15 1.08 1.02-.46.4-1.04.55-1.87 1.26-.14.15-.13.29-.14.42l-.26.23a9.29 9.29 0 011.54 6.64l.3.08c.05.08.16.26.31.32.64.2 1.29.21 2.14.3 1.28.14.8 1.8-.44 1.42z" },
    { "name": "HashiCorp", "description": "Certified Terraform Associate", "date": "April, 2021", "badge": "https://www.credly.com/badges/4c8601e9-4215-4bbd-853a-61d73c665102", "d": "M11.04 5.69l9.91 5.03v10.07l-9.9-5.03V5.69zm11 5.03v10.07l9.92-5.03V5.69l-9.92 5.03zM.04.07v10.07l9.92 5.03V5.1L.05.07zm11 26.85l9.91 5.04V21.89l-9.9-5.03v10.06z" },
    { "name": "CKAD", "description": "Certified Kubernetes Application Developer", "date": "April, 2021", "badge": "https://www.credly.com/badges/b82f1e41-6e19-49ec-831b-6068dd6da480", "d": "M.05 19.37L2.8 7.43c.14-.62.57-1.16 1.15-1.44L15.07.68a2.2 2.2 0 011.85 0l11.13 5.31c.57.28 1 .82 1.15 1.43l2.75 11.95c.14.61-.02 1.29-.41 1.78l-7.7 9.58c-.4.5-1.03.8-1.66.8H9.82c-.63 0-1.26-.3-1.66-.8l-7.7-9.58a2.08 2.08 0 01-.41-1.78zm15.37 1.1l-1.87 3.38a7.6 7.6 0 004.91 0l-1.87-3.39c-.34-.47-.91-.42-1.17 0zm-2.8-1.9l-3.8.64a7.63 7.63 0 003.07 3.83l1.47-3.56c.16-.53-.19-.97-.73-.92zm6.02.89l1.49 3.6a7.6 7.6 0 003.07-3.86l-3.84-.65c-.56-.06-.9.4-.72.9zm-3.97-3.15l.26 1.15 1.07.51 1.06-.5.27-1.16-.74-.92h-1.18l-.74.92zm5.2.01l3.74 1.07a7.84 7.84 0 00-1.12-4.79l-2.87 2.58c-.34.4-.32.88.26 1.14zm-7.5-1.13L9.49 12.6a7.6 7.6 0 00-1.07 4.8l3.7-1.06c.5-.2.67-.72.27-1.15zm5.82-1.8l3.15-2.23a7.66 7.66 0 00-4.42-2.13l.22 3.86c.09.65.58.75 1.05.5zm-7.56-2.23l3.17 2.24c.52.33 1.01-.02 1.06-.5l.22-3.87a7.67 7.67 0 00-4.45 2.13zm17.17 8.9c-.31-.1-1.3-.54-1.95-.64-.2-.01-.3.08-.4.16l-.32-.06a9.6 9.6 0 01-4.25 5.35l.12.3c-.05.12-.12.24-.06.43.28.67.7 1.2 1.05 1.76.67 1.11-.64 1.88-1.28.76-.25-.69-.46-1.54-.77-2.04-.1-.17-.25-.19-.37-.23l-.16-.28c-2.3.85-4.57.82-6.8-.02l-.17.3c-.12.04-.24.07-.32.16-.34.44-.63 1.65-.87 2.19-.51.98-1.78.3-1.33-.63.29-.6.67-.92 1.15-1.99a.57.57 0 00-.06-.42l.13-.32a9.6 9.6 0 01-4.25-5.3l-.32.05a.59.59 0 00-.42-.15c-.4.06-.84.11-1.29.38-2.05 1.22-2.8-1.4-.28-1.24.97.06 1.37-.08 1.64-.54l.3-.09a9.54 9.54 0 011.5-6.65l-.23-.21c-.01-.1-.03-.3-.15-.43-.93-.79-1.31-.79-1.86-1.25a.74.74 0 01.91-1.16c.5.4.79.9 1.65 1.55.17.1.3.06.43.04l.27.19a9.69 9.69 0 016.15-2.96l.02-.31c.1-.1.2-.23.23-.38.08-.76-.18-1.67-.18-2.25.02-1.06 1.44-1.12 1.48 0 .01.65-.2 1-.19 2.25.03.2.15.28.24.37l.02.33a9.66 9.66 0 016.12 2.95l.28-.2c.1 0 .3.04.45-.05.37-.23.92-.82 1.48-1.41.82-.85 2 .15 1.08 1.02-.46.4-1.04.55-1.87 1.26-.14.15-.13.29-.14.42l-.26.23a9.29 9.29 0 011.54 6.64l.3.08c.05.08.16.26.31.32.64.2 1.29.21 2.14.3 1.28.14.8 1.8-.44 1.42z" }
  ]
  posts = [
    { "title": "Git for everyone", "description": "Introduction to git", "href": "https://medium.com/empathyco/git-for-everyone-8bf7e9efc254" },
    { "title": "Documentation As Code", "description": "Docusaurus and MDX", "href": "https://medium.com/empathyco/documentation-as-code-10e83b02a3a5" },
    { "title": "Guide to optimise user management", "description": "Integrating Personio, GitHub & Google Workspace", "href": "https://medium.com/empathyco/user-management-with-personio-github-google-workspace-c1feae314356" },
  ]
  talks = [
    { "event": "CLOUD NATIVE ASTURIAS", "title": "How to manage GitHub organizations with Terraform", "date": "May, 2021", "href": "https://www.youtube.com/watch?v=J2vGGGa4Y20" },
    { "event": "KUBERNETES COMMUNITY DAYS GUATEMALA", "title": "GitHub Actions self-hosting runners in k8s", "date": "Nov, 2021", "href": "https://www.youtube.com/watch?v=eNrbfLPqxBM" },
  ]
  projects = [
    { "name": "feta.es", "href": "https://feta.es" },
    { "name": "canoserigrafia.com", "href": "https://canoserigrafia.com" },
    { "name": "storeos.org", "href": "https://storeos.org" },
  ]

  changeMode() {
    this.isDark = !this.isDark;
    this.textButton = this.textButton.includes('Heck') ? 'Dude, turn lights on' : 'Heck, bring me dark';
  }

}
