<template>
  <div v-if="sitemap">
    <ul>
      <li v-for="item in sitemap" :key="item.entity_unique_id">
        <NuxtLink :to="`tier/${item.entity_unique_id}/${item.entity_slug}`">{{ item.entity_title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  setup() {
    const { sitemap } = inject('flyo');
    const { isLoading, response, error, fetch } = sitemap

    fetch()

    return {
      isLoading,
      sitemap: response,
      error
    };
  }
};
</script>