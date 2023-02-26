<template>
  <div>
    <!-- https://nuxt.com/docs/getting-started/error-handling#handling-errors -->
    <h1>Fehler</h1>
    <p>{{ error.statusMessage || error.message }}</p>
    <div>
      <strong>Stack trace</strong><br />
      <div v-html="error.stack" />
    </div>
    <button type="button" @click="handleError">Zur Startseite</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>