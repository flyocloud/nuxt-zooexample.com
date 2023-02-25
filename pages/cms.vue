<template>
  <div v-if="page">
    <h1 v-edit>{{ page.title }}</h1>
    <FlyoPage :page="page" />
    <button @click="update()" :disabled="!isEditable()">Update</button>
  </div>
</template>

<script>
export default {
  async setup() {
    // resolve the current page using the routers current path (useRoute().path)
    const flyoPage = await useFlyoCurrentPage()

    return {
      page: flyoPage.response,
      isEditable: flyoPage.isEditable,
      putContent: flyoPage.putContent
    }
  },
  methods: {
    async update() {
      // *WIP* composable concept for change content.
      await this.putContent("4db2d668-a331-4055-b7d6-0363a7adbfec", "titel", "Das ist ein Test")
    }
  }
};
</script>