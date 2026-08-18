<template>
  <article
    v-if="entity"
    class="rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-200/60 sm:p-6 lg:p-8"
  >
    <div class="grid items-start gap-8 lg:grid-cols-2">
      <div v-if="entity.entity?.entity_image" class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <img
          :src="entity.entity.entity_image"
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
          {{ entity.model.long_text }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
// get the uniqueid from the routing
const uid = useRoute().params.uid
let entity = null

// get the entity detail response
try {
  const { response } = await useFlyoEntity(uid)
  entity = response
} catch (e) {
  console.log(e)
  console.warn(e)
}
</script>