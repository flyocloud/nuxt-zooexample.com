<template>
  <div v-if="entity" class="container">
    <div class="row mt-3">
      <div class="col-6">
        <img :src="entity.model.image.source" class="img-fluid" />
      </div>
      <div class="col-6">
        <h2>{{ entity.entity.entity_teaser }}</h2>
        <p class="mt-3">{{ entity.model.description }}</p>
        <p>&copy; {{ entity.model.copyright }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// get the uniqueid from the routing
const uid = useRoute().params.uid

// get the entity detail response
const { response: entity } = await useFlyoEntity(uid)
</script>