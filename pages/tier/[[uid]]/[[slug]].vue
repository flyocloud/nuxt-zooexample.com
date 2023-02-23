<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="error">
      Error: {{ error }}
    </div>
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
  </div>
</template>

<script>
export default {
  async setup() {
    const { entity } = inject('flyo')

    // get the uniqueid from the routing
    const uid = useRoute().params.uid

    // get the entity detail response
    const { isLoading, response, error, fetch: fetchEntity } = entity
    
    // Fetch entity
    fetchEntity(uid)

    // @todo: move this to vue3 plugin
    watch(response, (newVal) => {
      if (newVal) {
        // generate flyo metric request
        console.log('...', newVal.entity_metric.api)
        fetch(newVal.entity_metric.api)
      }
    })
    
    return {
      isLoading,
      response,
      error
    };
  }
};
</script>