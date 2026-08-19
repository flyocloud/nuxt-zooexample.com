<template>
  <section
    v-if="entries"
    class="rounded-3xl border border-border bg-card p-6 sm:p-8"
  >
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Zoo Sitemap
        </h1>
        <p class="mt-2 text-sm text-muted-foreground">
          Every page and animal in the live content feed.
        </p>
      </div>

      <a
        href="/sitemap.xml"
        class="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-brand/50 hover:text-brand"
      >
        sitemap.xml
      </a>
    </div>

    <ul class="mt-6 grid gap-3 sm:grid-cols-2">
      <li
        v-for="item in entries"
        :key="item.entity_unique_id"
        class="reveal-rise"
      >
        <NuxtLink
          :to="item.href"
          class="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3 text-foreground transition hover:border-brand/40 hover:bg-accent"
        >
          <span>
            <span class="block font-medium">
              {{ item.entity_title }}
            </span>
            <span class="mt-0.5 block text-xs text-muted-foreground">
              {{ item.href }}
            </span>
          </span>
          <time
            v-if="item.updated_at"
            :datetime="new Date(item.updated_at * 1000).toISOString()"
            class="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition group-hover:text-brand"
          >
            {{ formatDate(item.updated_at) }}
          </time>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { response: sitemap } = await useFlyoSitemap()

// `href` is the finished link the CMS resolved for the item; an item without
// one has no reachable URL.
const entries = computed(() => (sitemap.value ?? []).filter(item => item.href))

const dateFormat = new Intl.DateTimeFormat('de-CH', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const formatDate = timestamp => dateFormat.format(new Date(timestamp * 1000))
</script>
