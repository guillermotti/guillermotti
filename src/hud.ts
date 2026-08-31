import {
  certifications,
  latestProject,
  networks,
  posts,
  projects,
  talks,
} from "./content";
import { setTheme, type Theme, type WorldState } from "./world";

const MARK = `
<svg class="mark" width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
  <path d="M13.4 29.92L13.96 18.4L10.12 29.28L7.88004 28.4L12.84 17.92L5.16004 26.56L3.40004 24.8L12.04 17.12L1.56004 22.08L0.680039 19.84L11.56 16L0.0400391 16.56V14.16L11.56 14.8L0.680039 10.88L1.56004 8.71999L12.04 13.68L3.40004 5.91999L5.16004 4.23999L12.84 12.8L7.88004 2.39999L10.12 1.43999L13.96 12.4L13.4 0.799988H15.8L15.16 12.32L19.08 1.43999L21.24 2.39999L16.28 12.8L24.04 4.23999L25.72 5.91999L17.16 13.68L27.56 8.71999L28.52 10.88L17.56 14.8L29.16 14.16V16.56L17.56 16L28.52 19.84L27.56 22.08L17.16 17.12L25.72 24.8L24.04 26.56L16.28 17.92L21.24 28.4L19.08 29.28L15.16 18.4L15.8 29.92H13.4Z" fill="currentColor"/>
</svg>
`;

function themeCopy(theme: Theme): string {
  return theme === "night" ? "Dude, turn lights on" : "Heck, bring me dark";
}

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "day" ? "day" : "night";
}

export function mountHud(root: HTMLElement, state: WorldState): void {
  root.innerHTML = `
    <header class="topbar">
      ${MARK}
      <button class="theme" type="button" aria-label="Toggle day and night">${themeCopy(currentTheme())}</button>
    </header>

    <main>
      <section class="hero">
        <p class="eyebrow">Platform engineer · Gijón, Asturias</p>
        <h1>Guille Vigil</h1>
        <p class="lede">
          <strong>Guille</strong> is a Platform Engineer based in Gijón, Asturias — Spain.
          He is a <a href="${certifications[0]!.badge}" target="_blank" rel="noopener noreferrer">CNCF Kubestronaut</a>,
          passionate about all <strong>Open Source</strong> related.
          Checkout his <a href="${latestProject.href}" target="_blank" rel="noopener noreferrer">latest project</a>.
        </p>
        <div class="social">
          ${networks
            .map(
              (network) => `
            <a href="${network.href}" target="_blank" rel="noopener noreferrer" aria-label="${network.label}">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="${network.path}" fill="currentColor"/></svg>
              <span>${network.label}</span>
            </a>`,
            )
            .join("")}
        </div>
      </section>

      <section class="block">
        <h2>Certifications</h2>
        <ul class="certs">
          ${certifications
            .map(
              (cert) => `
            <li>
              <a href="${cert.badge}" target="_blank" rel="noopener noreferrer">
                <img src="${cert.src}" alt="" width="48" height="48" />
                <span>
                  <strong>${cert.name}</strong>
                  <em>${cert.description}</em>
                </span>
                <time>${cert.date}</time>
              </a>
            </li>`,
            )
            .join("")}
        </ul>
      </section>

      <section class="block">
        <h2>Talks</h2>
        <ul class="rows">
          ${talks
            .map(
              (talk) => `
            <li>
              <a href="${talk.href}" target="_blank" rel="noopener noreferrer">
                <span class="meta">${talk.event}</span>
                <strong>${talk.title}</strong>
                <time>${talk.date}</time>
              </a>
            </li>`,
            )
            .join("")}
        </ul>
      </section>

      <section class="block">
        <h2>Posts</h2>
        <ul class="rows">
          ${posts
            .map(
              (post) => `
            <li>
              <a href="${post.href}" target="_blank" rel="noopener noreferrer">
                <strong>${post.title}</strong>
                <span class="meta">${post.description}</span>
              </a>
            </li>`,
            )
            .join("")}
        </ul>
      </section>

      <section class="block">
        <h2>Side Projects</h2>
        <ul class="projects">
          ${projects
            .map(
              (project) => `
            <li>
              <a href="${project.href}" target="_blank" rel="noopener noreferrer">${project.name}</a>
            </li>`,
            )
            .join("")}
        </ul>
      </section>
    </main>

    <footer>
      <p>Designed with ❤️ by <a href="https://www.alejandru.com/" target="_blank" rel="noopener noreferrer">@alex</a></p>
    </footer>
  `;

  const button = root.querySelector(".theme");
  button?.addEventListener("click", () => {
    const next: Theme = currentTheme() === "night" ? "day" : "night";
    setTheme(state, next);
    button.textContent = themeCopy(next);
  });
}
