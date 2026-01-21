<template>
  <div class="container" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <div class="header-logo">
            <img src="/assets/symbol.svg" alt="Logo" class="logo" />
          </div>
          <div class="about-section">
            <p class="about-text">
              <strong>Guille</strong> is a Platform Engineer based in Gijón, Asturias - Spain. 
              He is a <strong class="underlined">CNCF Kubestronaut</strong>, passionate about all <strong>Open Source</strong> related. 
              Checkout his <a :href="latestProjectHref" class="project-link"><strong>latest project!</strong></a>
            </p>
          </div>
          <div class="social-links">
            <a 
              v-for="network in data.networks" 
              :key="network.href"
              :href="network.href" 
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="network.href.includes('github') ? 'GitHub' : 'LinkedIn'"
            >
              <svg 
                :width="network.width" 
                :height="network.height" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="network.d" />
              </svg>
            </a>
          </div>
        </div>
        <div class="header-right">
          <div class="theme-toggle">
            <button @click="toggleTheme" class="theme-btn" aria-label="Toggle theme">
              <img 
                :src="isDarkMode ? '/assets/Green-in-Jumper11.png' : '/assets/Light-brown-in-Basic9.png'" 
                alt="Theme toggle icon"
                class="theme-icon"
              />
            </button>
            <span @click="toggleTheme" class="theme-text">{{ themeText }}</span>
          </div>
          <div class="social-links">
            <a 
              v-for="network in data.networks" 
              :key="network.href"
              :href="network.href" 
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :aria-label="network.href.includes('github') ? 'GitHub' : 'LinkedIn'"
            >
              <svg 
                :width="network.width" 
                :height="network.height" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path :d="network.d" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Certifications Section -->
    <section class="section certifications-section">
      <h2 class="section-title">Certifications</h2>
      <div class="section-divider"></div>
      <div class="certifications-grid">
        <div v-for="cert in data.certifications" :key="cert.badge" class="certification-item">
          <a :href="cert.badge" target="_blank" rel="noopener noreferrer">
            <div class="certification-badge-wrapper">
              <img 
                :src="getImagePath(cert.src)" 
                :alt="`${cert.name} ${cert.description}`"
                class="certification-badge"
              />
            </div>
            <div class="certification-content">
              <div class="certification-header">
                <strong class="certification-name">{{ cert.name }}</strong>
                <span class="certification-date">{{ cert.date }}</span>
              </div>
              <div class="certification-description-wrapper">
                <span class="certification-description underlined">{{ cert.description }}</span>
                <svg class="certification-link-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.8 13.2l-1.4-2.83-6.83 3.94L.2 8.46l6.83-3.94-1.76-2.64L7.78.43l8.34 2.73-1.8 8.6-2.52 1.45zm1.68-1.65l1.72-7.86-7.66-2.43 2.02 3.1-6.75 3.9 2.24 3.88 6.75-3.9 1.68 3.3z"/>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Talks Section -->
    <section class="section talks-section">
      <h2 class="section-title">Talks</h2>
      <div class="section-divider"></div>
      <div class="talks-list">
        <div v-for="talk in data.talks" :key="`${talk.event}-${talk.title}`" class="talk-item">
          <a :href="talk.href" target="_blank" rel="noopener noreferrer">
            <div class="talk-content">
              <div class="talk-header">
                <strong class="talk-event">{{ talk.event }}</strong>
                <span class="talk-date">{{ talk.date }}</span>
              </div>
              <div class="talk-title-wrapper">
                <span class="talk-title-text underlined">{{ talk.title }}</span>
                <svg class="talk-link-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.8 13.2l-1.4-2.83-6.83 3.94L.2 8.46l6.83-3.94-1.76-2.64L7.78.43l8.34 2.73-1.8 8.6-2.52 1.45zm1.68-1.65l1.72-7.86-7.66-2.43 2.02 3.1-6.75 3.9 2.24 3.88 6.75-3.9 1.68 3.3z"/>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="section posts-section">
      <h2 class="section-title">Posts</h2>
      <div class="section-divider"></div>
      <div class="posts-list">
        <div v-for="post in data.posts" :key="post.href" class="post-item">
          <a :href="post.href" target="_blank" rel="noopener noreferrer">
            <div class="post-content">
              <div class="post-title-wrapper">
                <strong class="post-title-text">{{ post.title }}</strong>
                <svg class="post-link-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.8 13.2l-1.4-2.83-6.83 3.94L.2 8.46l6.83-3.94-1.76-2.64L7.78.43l8.34 2.73-1.8 8.6-2.52 1.45zm1.68-1.65l1.72-7.86-7.66-2.43 2.02 3.1-6.75 3.9 2.24 3.88 6.75-3.9 1.68 3.3z"/>
                </svg>
              </div>
              <span class="post-description underlined">{{ post.description }}</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Side Projects Section -->
    <section class="section projects-section">
      <h2 class="section-title">Side Projects</h2>
      <div class="section-divider"></div>
      <div class="projects-list">
        <div v-for="project in data.projects" :key="project.href" class="project-item">
          <a :href="project.href" target="_blank" rel="noopener noreferrer">
            <div class="project-content">
              <div class="project-title-wrapper">
                <span class="project-name underlined">{{ project.name }}</span>
                <svg class="project-link-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.8 13.2l-1.4-2.83-6.83 3.94L.2 8.46l6.83-3.94-1.76-2.64L7.78.43l8.34 2.73-1.8 8.6-2.52 1.45zm1.68-1.65l1.72-7.86-7.66-2.43 2.02 3.1-6.75 3.9 2.24 3.88 6.75-3.9 1.68 3.3z"/>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>Designed with ❤️ by <a href="https://www.alejandru.com/" target="_blank" rel="noopener noreferrer">@alex</a></p>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const isDarkMode = ref(false)
    const data = ref({
      networks: [],
      certifications: [],
      posts: [],
      talks: [],
      projects: []
    })

    // Load data from JSON
    onMounted(async () => {
      // Load theme from localStorage
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        isDarkMode.value = true
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }

      // Load data.json
      try {
        const response = await fetch('/data.json')
        const jsonData = await response.json()
        data.value = jsonData
      } catch (error) {
        console.error('Error loading data:', error)
      }
    })

    const themeText = computed(() => {
      return isDarkMode.value ? 'Dude, turn lights on' : 'Heck, bring me dark'
    })

    const latestProjectHref = computed(() => {
      return data.value.projects && data.value.projects.length > 0 ? data.value.projects[data.value.projects.length - 1].href : '#'
    })

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
      if (isDarkMode.value) {
        document.body.classList.add('dark-mode')
      } else {
        document.body.classList.remove('dark-mode')
      }
    }

    const getImagePath = (src) => {
      // Return the path as-is since it's already correct
      return src
    }

    return {
      data,
      isDarkMode,
      themeText,
      latestProjectHref,
      toggleTheme,
      getImagePath
    }
  }
}
</script>

