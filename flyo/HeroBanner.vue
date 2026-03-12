
<template>
  <section
    v-bind="editable(block)"
    class="my-6 relative overflow-hidden rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-slate-200/60 sm:my-8 sm:p-8 lg:p-10"
  >
    <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-200/40 blur-2xl" />
    <div class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-200/30 blur-2xl" />

    <div class="relative grid items-center gap-8 lg:grid-cols-2">
      <div class="order-2 lg:order-1">
        <h1 class="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          {{ content.title }}
        </h1>
        <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          {{ content.teaser }}
        </p>
      </div>

      <div class="order-1 lg:order-2">
        <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-300/60">
          <img
            :src="content.image.source"
            class="h-full w-full object-cover"
            alt="Zoo spotlight image"
            width="700"
            height="500"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
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