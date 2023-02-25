<template>
  <div v-if="response" class="container">
    <div class="row mt-3">
      <div class="col-6">
        <img :src="response.model.image.source" class="img-fluid" />
      </div>
      <div class="col-6">
        <h2>{{ response.entity.entity_teaser }}</h2>
        <p class="mt-3">{{ response.model.description }}</p>
        <p>&copy; {{ response.model.copyright }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async setup() {
    // get the uniqueid from the routing
    const uid = useRoute().params.uid

    // get the entity detail response
    const { response } = await useFlyoEntity(uid)
    
    return {
      response
    }
  },
  mounted() {
    fetch(this.response.entity.entity_metric.api)
  }
}
</script>