<template>
  <main class="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-16 sm:px-6">
    <section class="w-full rounded-3xl border border-rose-200 bg-white/95 p-6 shadow-xl shadow-rose-100/50 sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">
        Something went wrong
      </p>
      <h1 class="mt-3 text-4xl font-bold text-slate-900">
        Error
      </h1>
      <p class="mt-3 text-base text-slate-600">
        {{ error.statusMessage || error.message }}
      </p>

      <details class="mt-6 rounded-2xl bg-slate-100 p-4 text-xs text-slate-700">
        <summary class="cursor-pointer font-semibold text-slate-900">
          Stack trace
        </summary>
        <pre class="mt-3 whitespace-pre-wrap break-words">{{ error.stack }}</pre>
      </details>

      <div class="mt-6">
        <button
          type="button"
          class="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
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
const handleError = () => clearError({ redirect: '/' })
</script>