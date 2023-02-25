<template>
  <div>
    <!-- https://nuxt.com/docs/getting-started/error-handling#handling-errors -->
    <h1>Fehler</h1>
    <p>{{ error.statusMessage }}</p>
    <button type="button" @click="handleError">Zur Startseite</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>