<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>
    <FlyoPage :page="page" />
    <button @click="update()" :disabled="!isEditable()">Update</button>
  </div>
</template>

<script>
export default {
  async setup() {
    // resolve the current page using the routers current path (useRoute().path)
    const { page, error, putContent, isEditable } = await useFlyoCurrentPage();
    return {
      page: page,
      error: error,
      putContent: putContent,
      isEditable: isEditable
    };
  },
  methods: {
    async update() {
      // *WIP* composable concept for change content.
      await this.putContent("4db2d668-a331-4055-b7d6-0363a7adbfec", "titel", "Das ist ein Test")
    }
  }
};
</script>