<template>
  <article
    v-if="entity"
    class="rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-200/60 sm:p-6 lg:p-8"
  >
    <nav
      v-if="breadcrumb.length"
      aria-label="Breadcrumb"
      class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
    >
      <ol class="flex flex-wrap items-center gap-2">
        <li
          v-for="(crumb, index) in breadcrumb"
          :key="crumb.href || crumb.slug || index"
          class="flex items-center gap-2"
        >
          <span
            v-if="index"
            aria-hidden="true"
          >/</span>
          <NuxtLink
            v-if="crumb.href"
            :to="crumb.href"
            class="transition hover:text-teal-700"
          >
            {{ crumb.title }}
          </NuxtLink>
          <span
            v-else
            class="text-slate-500"
          >
            {{ crumb.title }}
          </span>
        </li>
        <li
          v-if="title"
          aria-current="page"
          class="flex items-center gap-2 text-slate-500"
        >
          <span
            v-if="breadcrumb.length"
            aria-hidden="true"
          >/</span>
          {{ title }}
        </li>
      </ol>
    </nav>

    <div
      class="grid items-start gap-8 lg:grid-cols-2"
      :class="breadcrumb.length ? 'mt-6' : ''"
    >
      <figure
        v-if="image"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
      >
        <img
          :src="image"
          :alt="model.image?.caption || title"
          class="h-full w-full object-cover"
          width="900"
          height="900"
        >
        <figcaption
          v-if="model.image?.caption || model.image?.copyright"
          class="px-4 py-2 text-xs text-slate-500"
        >
          {{ [model.image?.caption, model.image?.copyright].filter(Boolean).join(' · ') }}
        </figcaption>
      </figure>

      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Zoo Profile
        </p>
        <h1 class="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          {{ title }}
        </h1>
        <p
          v-if="teaser"
          class="mt-4 text-base leading-7 text-slate-600 sm:text-lg"
        >
          {{ teaser }}
        </p>
        <p
          v-if="model.long_text"
          class="mt-5 text-base leading-7 text-slate-600"
        >
          {{ model.long_text }}
        </p>
      </div>
    </div>

    <section
      v-if="hasHabitat"
      class="mt-10 rounded-2xl border border-sky-100 bg-sky-50/60 p-5 sm:p-6"
    >
      <h2 class="text-2xl font-bold text-slate-900">
        {{ model.habitat_title || 'Lebensraum' }}
      </h2>
      <p
        v-if="model.habitat_teaser"
        class="mt-2 text-base leading-7 text-slate-700"
      >
        {{ model.habitat_teaser }}
      </p>
      <p
        v-if="model.habitat_description"
        class="mt-4 text-sm leading-6 text-slate-600"
      >
        {{ model.habitat_description }}
      </p>
    </section>

    <footer
      v-if="meta?.updated_at"
      class="mt-8 border-t border-slate-200 pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
    >
      Aktualisiert
      <time :datetime="new Date(meta.updated_at * 1000).toISOString()">
        {{ formatDate(meta.updated_at) }}
      </time>
    </footer>
  </article>
</template>

<script setup lang="ts">
// The generated OpenAPI types for this integration. Regenerate with
// `npm run flyo:types` whenever the Nitro schema changes.
import type { Entity, EntityTiere } from '~/src/generated/flyo'

// get the uniqueid from the routing
const uid = String(useRoute().params.uid ?? '')

// `useFlyoEntity()` is untyped (`Promise<any>`), so annotate the response with
// the `entity` schema: an `entity` interface every schema shares, plus a
// `model` holding the fields of this schema — here "Tiere" (EntityTiere).
let entity: Entity | null = null

// get the entity detail response
try {
  const { response } = await useFlyoEntity(uid)
  entity = response as Entity
} catch (e) {
  console.warn(e)
}

// `entity.entity` is the shared interface, `entity.model` the schema fields.
const meta = entity?.entity
const model: EntityTiere = entity?.model ?? {}

// The model fields win, the shared interface is the fallback — a schema does
// not have to map every interface attribute onto a model field.
const title = model.title || meta?.entity_title || ''
const teaser = model.teaser || meta?.entity_teaser || ''

// The Flyo CDN resizes on the fly: `?w=`/`?h=` (leave one out to derive it from
// the original ratio) and `?format=` for webp/jpg/jpeg/png/gif.
const source = model.image?.source || meta?.entity_image || ''
const image = source ? `${source}?w=900&h=900&format=webp` : ''

const breadcrumb = entity?.breadcrumb ?? []
const hasHabitat = Boolean(model.habitat_title || model.habitat_teaser || model.habitat_description)

const dateFormat = new Intl.DateTimeFormat('de-CH', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const formatDate = (timestamp: number) => dateFormat.format(new Date(timestamp * 1000))

useSeoMeta({
  title,
  description: teaser,
  ogTitle: title,
  ogDescription: teaser,
  ogImage: source || undefined,
})

// `jsonld` is the schema.org representation the CMS built for this entity.
useHead({
  script: entity?.jsonld
    ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(entity.jsonld) }]
    : [],
})
</script>
