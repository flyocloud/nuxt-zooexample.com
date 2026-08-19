<template>
  <section class="rounded-3xl border border-border bg-card p-6 sm:p-8">
    <h1 class="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
      Search the Zoo
    </h1>
    <p class="mt-2 text-sm text-muted-foreground">
      Full-text search across every page and animal.
    </p>

    <div class="relative mt-6">
      <input
        v-model="input"
        type="search"
        placeholder="Try “Elefant”, “News” or “Essen”…"
        aria-label="Search the zoo"
        class="w-full rounded-2xl border border-input bg-background py-3 pl-4 pr-12 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand/50 focus:ring-2 focus:ring-brand/25"
      >
      <span
        v-if="pending"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        …
      </span>
    </div>

    <p
      v-if="error"
      class="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      Search is unavailable right now. Please try again.
    </p>

    <p
      v-else-if="!query"
      class="mt-6 text-sm text-muted-foreground"
    >
      Start typing to search.
    </p>

    <p
      v-else-if="!hits.length"
      class="mt-6 text-sm text-muted-foreground"
    >
      No results for “{{ query }}”.
    </p>

    <ul
      v-else
      class="mt-6 space-y-3"
    >
      <li
        v-for="hit in hits"
        :key="hit.entity_unique_id"
        class="reveal-rise"
      >
        <NuxtLink
          :to="hit.href"
          class="group block rounded-2xl border border-border bg-background px-4 py-3 transition hover:border-brand/40 hover:bg-accent"
        >
          <span class="flex items-baseline justify-between gap-4">
            <span class="font-medium text-foreground">
              {{ hit.entity_title }}
            </span>
            <span class="shrink-0 text-xs text-muted-foreground">
              {{ hit.href }}
            </span>
          </span>
          <span
            v-if="hit.entity_teaser"
            class="mt-1 block text-sm leading-6 text-muted-foreground"
          >
            {{ hit.entity_teaser }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// `input` follows the field, `query` is what actually reaches the API — the
// composable watches it and re-runs the search on every change, so debounce
// before handing it over rather than firing on each keystroke.
const input = ref(typeof route.query.q === 'string' ? route.query.q : '')
const query = ref(input.value.trim())

let debounce
watch(input, (value) => {
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    query.value = value.trim()
  }, 250)
})
onBeforeUnmount(() => clearTimeout(debounce))

// `-score` sorts best match first; plain `score` is the same ranking reversed.
const { response, error } = await useFlyoSearch(query, { sort: '-score' })

// An item without an `href` has no reachable URL.
const hits = computed(() => (response.value ?? []).filter(hit => hit.href))
const pending = computed(() => input.value.trim() !== query.value)

// Keep the query in the URL so a search can be shared or reloaded.
watch(query, (value) => {
  router.replace({ query: value ? { q: value } : {} })
})
</script>
