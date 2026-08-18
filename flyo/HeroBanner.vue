<template>
  <section
    v-bind="editableAttrs"
    class="my-6 relative overflow-hidden rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-xl shadow-slate-200/60 sm:my-8 sm:p-8 lg:p-10"
  >
    <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-200/40 blur-2xl" />
    <div class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-200/30 blur-2xl" />

    <div class="relative grid items-center gap-8 lg:grid-cols-2">
      <div class="order-2 lg:order-1">
        <h1 class="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          {{ block.content?.title }}
        </h1>
        <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          {{ block.content?.teaser }}
        </p>
      </div>

      <div
        v-if="block.content?.image?.source"
        class="order-1 lg:order-2"
      >
        <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-300/60">
          <img
            :src="`${block.content.image.source}?w=1400&format=webp`"
            :alt="block.content.image.caption || block.content.title || 'Zoo spotlight image'"
            class="h-full w-full object-cover"
            width="700"
            height="500"
            loading="lazy"
          >
        </div>
        <p
          v-if="block.content.image.copyright"
          class="mt-2 text-right text-xs text-slate-400"
        >
          © {{ block.content.image.copyright }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// The block schema already carries `config`, `content`, `items` and `slots`, so
// `block` is the only prop worth declaring — read the rest off it. FlyoBlock
// still passes those four individually, hence `inheritAttrs: false` so they do
// not land on the root element as attributes.
import type { Block, BlockHeroBanner } from '~/src/generated/flyo'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  block?: BlockHeroBanner
}>(), {
  block: () => ({}),
})

// `editable()` is declared against the base `block` schema, whose `slots` is a
// map of slot objects — a block without slots types them as `{ _empty?: bool }`
// instead, so widen for the call. It only ever reads `uid`.
const editableAttrs = computed(() => editable(props.block as Block))
</script>
