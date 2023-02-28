<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>
    <FlyoPage :page="page" />
    <button @click="update()" :disabled="!isEditable()">Update</button>
  </div>
</template>

<script setup>
const { response: page, isEditable, putContent } = await useFlyoCurrentPage()

const update = async () => {
	await putContent("4db2d668-a331-4055-b7d6-0363a7adbfec", "titel", "Das ist ein Test")
}
</script>