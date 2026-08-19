<template>
  <main class="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-16 sm:px-6">
    <section class="w-full rounded-3xl border border-destructive/30 bg-card p-6 sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-destructive">
        Something went wrong
      </p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Error
      </h1>
      <p class="mt-3 text-base text-muted-foreground">
        {{ error.statusMessage || error.message }}
      </p>

      <details class="mt-6 rounded-2xl bg-muted p-4 text-xs text-muted-foreground">
        <summary class="cursor-pointer font-semibold text-foreground">
          Stack trace
        </summary>
        <pre class="mt-3 whitespace-pre-wrap break-words">{{ error.stack }}</pre>
      </details>

      <div class="mt-6">
        <button
          type="button"
          class="rounded-2xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          @click="handleError"
        >
          Back To Homepage
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

// The error page replaces the app (no layout), so wire up the theme here too.
useTheme()

const handleError = () => clearError({ redirect: '/' })
</script>
