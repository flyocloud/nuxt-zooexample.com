<template>
  <div class="min-h-screen">
    <NuxtLoadingIndicator
      :height="4"
      color="#0f766e"
    />

    <div
      v-if="config"
      class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8"
    >
      <header class="reveal-soft rounded-3xl border border-sky-100/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur">
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <NuxtLink
            to="/"
            class="group inline-flex items-center gap-3"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-sky-300 to-cyan-300 text-slate-900 shadow-md shadow-slate-300/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
            <span>
              <span class="block text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700/90">Headless CMS Demo</span>
              <span class="block text-2xl font-bold leading-tight text-slate-900">Flyo Zoo</span>
            </span>
          </NuxtLink>

          <nav class="flex flex-wrap items-center gap-2">
            <NuxtLink
              v-for="(item, key) in navItems"
              :key="key"
              :to="normalizeHref(item.href)"
              class="rounded-full px-4 py-2 text-sm font-semibold transition"
              :class="isActiveLink(item.href) ? 'bg-teal-100 text-teal-950 ring-1 ring-teal-300 hover:bg-teal-100 hover:text-teal-950' : 'text-slate-700 hover:bg-sky-100 hover:text-sky-900'"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </header>

      <main class="reveal-rise mt-8 flex-1">
        <slot />
      </main>

      <footer class="reveal-rise-delay mt-12 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-200/50">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Flyo Zoo</p>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              A playful Nuxt demo powered by <a href="https://flyo.ch" class="underline">Flyo Nitro CMS</a>.
            </p>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-slate-900">Explore</h2>
            <ul class="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <NuxtLink
                  to="/sitemap"
                  class="transition hover:text-teal-700"
                >
                  Sitemap
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/"
                  class="transition hover:text-teal-700"
                >
                  Zoo Overview
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-slate-900">Built With</h2>
            <ul class="mt-3 space-y-2 text-sm text-slate-600">
              <li>Nuxt 4</li>
              <li>Tailwind CSS v4</li>
              <li>Flyo Headless CMS</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { response: config } = await useFlyoConfig()

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