<template>
  <!-- eslint-disable-next-line vue/no-v-html -- the CMS delivers the field as parsed HTML -->
  <article
    v-if="block.content?.content?.html"
    v-bind="editableAttrs"
    class="wysiwyg my-6 mx-auto rounded-3xl border border-border bg-card p-6 text-foreground/80 sm:my-8 sm:p-8"
    v-html="block.content.content.html"
  />
</template>

<script setup lang="ts">
// The block schema already carries `config`, `content`, `items` and `slots`, so
// `block` is the only prop worth declaring — read the rest off it. FlyoBlock
// still passes those four individually, hence `inheritAttrs: false` so they do
// not land on the root element as attributes. The wysiwyg field carries both
// `html` and the TipTap `json` annotation; this renders the parsed HTML.
import type { Block, BlockText } from '~/src/generated/flyo'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  block?: BlockText
}>(), {
  block: () => ({}),
})

// `editable()` is declared against the base `block` schema, whose `slots` is a
// map of slot objects — a block without slots types them as `{ _empty?: bool }`
// instead, so widen for the call. It only ever reads `uid`.
const editableAttrs = computed(() => editable(props.block as Block))
</script>

<style scoped>
.wysiwyg :deep(h1),
.wysiwyg :deep(h2),
.wysiwyg :deep(h3) {
  color: var(--foreground);
  font-weight: 600;
  letter-spacing: -0.025em;
}

.wysiwyg :deep(h1) {
  font-size: 2rem;
  line-height: 1.15;
}

.wysiwyg :deep(h2) {
  margin-top: 1.4rem;
  font-size: 1.6rem;
  line-height: 1.2;
}

.wysiwyg :deep(p),
.wysiwyg :deep(ul),
.wysiwyg :deep(ol) {
  margin-top: 1rem;
  line-height: 1.75;
}

.wysiwyg :deep(a) {
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
}

.wysiwyg :deep(a:hover) {
  color: var(--foreground);
}
</style>