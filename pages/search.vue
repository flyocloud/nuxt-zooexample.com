<template>
  <section class="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/50 sm:p-8">
    <h1 class="text-3xl font-bold text-slate-900 sm:text-4xl">
      Search the Zoo
    </h1>
    <p class="mt-2 text-sm text-slate-600">
      Full-text search across every page and animal.
    </p>

    <div class="relative mt-6">
      <input
        v-model="input"
        type="search"
        placeholder="Try “Elefant”, “News” or “Essen”…"
        aria-label="Search the zoo"
        class="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-4 pr-12 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
      >
      <span
        v-if="pending"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        …
      </span>
    </div>

    <p
      v-if="error"
      class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
    >
      Search is unavailable right now. Please try again.
    </p>

    <p
      v-else-if="!query"
      class="mt-6 text-sm text-slate-500"
    >
      Start typing to search.
    </p>

    <p
      v-else-if="!hits.length"
      class="mt-6 text-sm text-slate-500"
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
          class="group block rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-sky-300 hover:bg-sky-50"
        >
          <span class="flex items-baseline justify-between gap-4">
            <span class="font-medium text-slate-800">
              {{ hit.entity_title }}
            </span>
            <span class="shrink-0 text-xs text-slate-400">
              {{ hit.href }}
            </span>
          </span>
          <span
            v-if="hit.entity_teaser"
            class="mt-1 block text-sm leading-6 text-slate-600"
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
