<template>
  <div class="flex min-h-screen flex-col">
    <NuxtLoadingIndicator
      :height="3"
      color="#3b82f6"
    />

    <template v-if="config">
      <div class="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <header class="reveal-soft mx-auto max-w-6xl rounded-4xl border border-gray-400/30 bg-white/45 py-2 pl-3 pr-3 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <NuxtLink
              to="/"
              class="group inline-flex items-center gap-2.5"
            >
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Z" />
                  <path d="M6.03 5.28a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06L6.03 6.34a.75.75 0 0 1 0-1.06Z" />
                  <path d="M17.91 5.28a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Z" />
                  <path d="M4.5 11.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h1.5Z" />
                  <path d="M21 11.25a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5H21Z" />
                  <path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
                  <path d="M6.97 16.59a.75.75 0 0 1 1.06 0l1.06 1.07a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.07Z" />
                  <path d="M16.91 16.59a.75.75 0 0 1 0 1.07l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.07a.75.75 0 0 1 1.06 0Z" />
                  <path d="M12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19.5Z" />
                </svg>
              </span>
              <span class="leading-tight">
                <span class="block text-lg font-bold tracking-tight text-foreground">flyo<span class="text-brand">zoo</span></span>
                <span class="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Headless CMS Demo</span>
              </span>
            </NuxtLink>

            <nav class="flex flex-wrap items-center gap-1">
              <NuxtLink
                v-for="(item, key) in navItems"
                :key="key"
                :to="normalizeHref(item.href)"
                class="rounded-xl px-4 py-2 text-sm font-medium transition-colors"
                :class="isActiveLink(item.href) ? 'bg-white/80 text-primary shadow-sm dark:bg-white/10' : 'text-foreground/80 hover:bg-white/80 hover:text-primary dark:hover:bg-white/10'"
              >
                {{ item.label }}
              </NuxtLink>

              <NuxtLink
                to="/search"
                class="ml-1 inline-flex items-center gap-1.5 rounded-2xl bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                Search
              </NuxtLink>
            </nav>
          </div>
        </header>
      </div>

      <main class="reveal-rise mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <slot />
      </main>

      <footer class="reveal-rise-delay border-t border-border bg-secondary/50">
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p class="text-lg font-bold tracking-tight text-foreground">flyo<span class="text-brand">zoo</span></p>
              <p class="mt-3 text-sm text-muted-foreground">
                A playful Nuxt demo powered by <a
                  href="https://flyo.ch"
                  class="text-foreground underline underline-offset-2 transition-colors hover:text-brand"
                >Flyo Nitro CMS</a> — the headless content hub from Switzerland.
              </p>
            </div>

            <div>
              <h2 class="text-sm font-semibold text-foreground">Explore</h2>
              <ul class="mt-4 space-y-3 text-sm">
                <li>
                  <NuxtLink
                    to="/sitemap"
                    class="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Sitemap
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/search"
                    class="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Search
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/"
                    class="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Zoo Overview
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="text-sm font-semibold text-foreground">Built With</h2>
              <ul class="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Nuxt 4</li>
                <li>Tailwind CSS v4</li>
                <li>Flyo Headless CMS</li>
              </ul>
            </div>
          </div>

          <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p class="text-xs text-muted-foreground">
              Flyo Zoo — a Flyo Headless CMS demo
            </p>

            <div
              class="flex items-center rounded-full border border-border p-0.5"
              role="group"
              aria-label="Color scheme"
            >
              <button
                type="button"
                aria-label="Switch to light mode"
                :aria-pressed="theme === 'light'"
                class="rounded-full p-1.5 transition-colors"
                :class="theme === 'light' ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'"
                @click="setTheme('light')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Switch to dark mode"
                :aria-pressed="theme === 'dark'"
                class="rounded-full p-1.5 transition-colors"
                :class="theme === 'dark' ? 'bg-foreground/10 text-foreground' : 'text-muted-foreground hover:text-foreground'"
                @click="setTheme('dark')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const { response: config } = await useFlyoConfig()
const { theme, setTheme } = useTheme()

const navItems = config?.containers?.nav?.items ?? []

const normalizeHref = (href = "") => {
  if (!href) {
    return "/"
  }

  if (/^https?:\/\//.test(href)) {
    return href
  }

  return href.startsWith("/") ? href : `/${href}`
}

const normalizePath = (path = "/") => {
  const sanitized = path.replace(/\/+$|\?.*$|#.*$/g, "")
  return sanitized.length ? sanitized : "/"
}

const getTargetPath = (href = "") => {
  const target = normalizeHref(href)

  if (/^https?:\/\//.test(target)) {
    return null
  }

  return normalizePath(target)
}

const activePath = computed(() => {
  const currentPath = normalizePath(route.path)
  let bestMatch = ""

  for (const item of navItems) {
    const targetPath = getTargetPath(item.href)

    if (!targetPath) {
      continue
    }

    if (targetPath === "/") {
      if (currentPath === "/" && bestMatch.length < 1) {
        bestMatch = "/"
      }
      continue
    }

    if (currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)) {
      if (targetPath.length > bestMatch.length) {
        bestMatch = targetPath
      }
    }
  }

  return bestMatch
})

const isActiveLink = (href = "") => {
  return getTargetPath(href) === activePath.value
}
</script>
