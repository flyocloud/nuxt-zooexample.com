<template>
  <div
    v-bind="editable(block)"
    class="container wysiwyg"
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

<style>
.wysiwyg > h1 {
  color: red;
}
</style>