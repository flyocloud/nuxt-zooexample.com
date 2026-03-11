<template>
  <div
    v-if="page"
    class="space-y-8"
  >

    <FlyoPage v-model:page="page" />
  </div>
</template>

<script setup>
const { response: page } = await useFlyoCurrentPage()

</script>