<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>
    <FlyoPage :page="page" />
  </div>
</template>

<script>
export default {
  setup() {
    const { page, error } = useFlyoPage(useRoute().path);
    return {
      page: page,
      error: error,
    };
  }
};
</script>