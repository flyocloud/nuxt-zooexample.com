<template>
  <article
    v-bind="editable(block)"
    class="wysiwyg my-6 mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white/95 p-6 text-slate-700 shadow-lg shadow-slate-200/50 sm:my-8 sm:p-8"
    v-html="content.content.html"
  />
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

<style scoped>
.wysiwyg :deep(h1),
.wysiwyg :deep(h2),
.wysiwyg :deep(h3) {
  color: #0f172a;
  font-weight: 700;
  letter-spacing: -0.02em;
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
  color: #0f766e;
  font-weight: 600;
  text-decoration: none;
}

.wysiwyg :deep(a:hover) {
  color: #0f172a;
}
</style>