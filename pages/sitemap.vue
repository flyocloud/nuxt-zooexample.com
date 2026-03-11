<template>
  <section
    v-if="sitemap"
    class="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/50 sm:p-8"
  >
    <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">
      Zoo Sitemap
    </h1>
    <p class="mt-2 text-sm text-slate-600">
      Jump directly to each animal page from the live content feed.
    </p>

    <ul class="mt-6 grid gap-3 sm:grid-cols-2">
      <li
        v-for="item in sitemap"
        :key="item.entity_unique_id"
        class="reveal-rise"
      >
        <NuxtLink
          :to="`/tier/${item.entity_unique_id}/${item.entity_slug}`"
          class="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50"
        >
          <span class="font-medium">
            {{ item.entity_title }}
          </span>
          <span class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition group-hover:text-teal-600">
            View
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { response: sitemap } = await useFlyoSitemap()
</script>