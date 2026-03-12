<template>
  <div
    v-bind="editable(block)"
    class="my-6 grid gap-6 sm:my-8 md:grid-cols-2"
  >
    <article
      v-for="(item, index) in items"
      :key="item.link?.entity_unique_id || item.title"
      :style="{ animationDelay: `${Math.min(index * 90, 360)}ms` }"
      class="reveal-rise group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div class="overflow-hidden rounded-2xl bg-slate-100">
        <img
          :src="`${item.image.source}/filter/900x900`"
          :alt="item.title"
          class="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
        >
      </div>

      <div class="p-3 sm:p-4">
        <h2 class="text-2xl font-bold text-slate-900">
          {{ item.title }}
        </h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          {{ item.teaser }}
        </p>
        <NuxtLink
          :to="`/tier/${item.link.entity_unique_id}/${item.link.entity_slug}`"
          class="mt-4 px-4 py-2 inline-flex items-center rounded-full bg-teal-100 text-teal-950 ring-1 ring-teal-300 hover:bg-teal-100 hover:text-teal-950"
        >
          Mehr erfahren
        </NuxtLink>
      </div>

      <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-200/40 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />
    </article>
  </div>
</template>

<script setup>
defineProps({
  block: {
    type: Object,
    default: () => ({})
  },
  config: {
    type: Object,
    default: () => ({})
  },
  content: {
    type: Object,
    default: () => ({})
  },
  items: {
    type: Array,
    default: () => []
  },
  slots: {
    type: Object,
    default: () => ({})
  },
})
</script>