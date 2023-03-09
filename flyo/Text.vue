<template>
  <div
    class="container"
    v-html="content.content"
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