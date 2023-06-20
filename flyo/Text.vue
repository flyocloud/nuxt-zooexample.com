<template>
  <div
    class="container wysiwyg"
    v-html="content.content.html"
  />
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    content: {
      type: Object,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => []
    },
    slots: {
      type: Object,
      default: () => {}
    },
  }
}
</script>

<style>
.wysiwyg > h1 {
  color: red;
}
</style>