<template>
  <div class="row row-cols-2">
    <div
      v-for="item in items"
      :key="item.title"
      class="col"
    >
      <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div class="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div class="my-3 py-3">
            <h2 class="display-5">
              {{ item.title }}
            </h2>
            <p class="lead">
              {{ item.teaser }}
            </p>
            <NuxtLink :to="`tier/${item.link.entity_unique_id}/${item.link.entity_slug}`">
              More
            </NuxtLink>
          </div>
          <div
            class="bg-dark shadow-sm mx-auto"
            style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"
          >
            <img
              :src="`${item.image.source}/filter/600x600`"
              class="img-fluid"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
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