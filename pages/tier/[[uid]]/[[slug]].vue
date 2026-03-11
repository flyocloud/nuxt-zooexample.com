<template>
  <article
    v-if="entity"
    class="rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-200/60 sm:p-6 lg:p-8"
  >
    <div class="grid items-start gap-8 lg:grid-cols-2">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <img
          :src="entity.model.image.source"
          :alt="entity.entity.entity_title"
          class="h-full w-full object-cover"
        >
      </div>

      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Zoo Profile
        </p>
        <h1 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          {{ entity.entity.entity_teaser }}
        </h1>
        <p class="mt-5 text-base leading-7 text-slate-600">
          {{ entity.model.description }}
        </p>
        <p class="mt-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          &copy; {{ entity.model.copyright }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
// get the uniqueid from the routing
const uid = useRoute().params.uid

// get the entity detail response
const { response: entity } = await useFlyoEntity(uid)
</script>