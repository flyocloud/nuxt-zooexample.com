import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: [["@flyo/nitro-nuxt", {
    apiToken: process.env.FLYO_API_TOKEN,
    liveEdit: true,
    registerPageRoutes: true,
    defaultPageRoute: "cms",
  }]],
  vite: {
    plugins: [tailwindcss()],
  },
  ssr: true,
  compatibilityDate: "2026-03-11",
});
