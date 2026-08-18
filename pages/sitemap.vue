<template>
  <section
    v-if="entries"
    class="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/50 sm:p-8"
  >
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">
          Zoo Sitemap
        </h1>
        <p class="mt-2 text-sm text-slate-600">
          Every page and animal in the live content feed.
        </p>
      </div>

      <a
        href="/sitemap.xml"
        class="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:border-teal-300 hover:text-teal-700"
      >
        sitemap.xml
      </a>
    </div>

    <ul class="mt-6 grid gap-3 sm:grid-cols-2">
      <li
        v-for="item in entries"
        :key="item.entity_unique_id"
        class="reveal-rise"
      >
        <NuxtLink
          :to="item.href"
          class="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
        >
          <span>
            <span class="block font-medium">
              {{ item.entity_title }}
            </span>
            <span class="mt-0.5 block text-xs text-slate-400">
              {{ item.href }}
            </span>
          </span>
          <time
            v-if="item.updated_at"
            :datetime="new Date(item.updated_at * 1000).toISOString()"
            class="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition group-hover:text-teal-600"
          >
            {{ formatDate(item.updated_at) }}
          </time>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { response: sitemap } = await useFlyoSitemap()

// `href` is the finished link the CMS resolved for the item; an item without
// one has no reachable URL.
const entries = computed(() => (sitemap.value ?? []).filter(item => item.href))

const dateFormat = new Intl.DateTimeFormat('de-CH', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const formatDate = timestamp => dateFormat.format(new Date(timestamp * 1000))
</script>
