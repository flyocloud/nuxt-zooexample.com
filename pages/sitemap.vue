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
  async setup() {
    const { response: sitemap } = await useFlyoSitemap()

    return {
      sitemap
    };
  }
};
</script>