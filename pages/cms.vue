<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>
    <FlyoPage v-model:page="page" />
  </div>
</template>

<script setup>
const { response: page } = await useFlyoCurrentPage()

</script>