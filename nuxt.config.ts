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
  runtimeConfig: {
    public: {
      // Absolute origin used for the <loc> entries in /sitemap.xml. Falls back
      // to the request origin, which is right in dev but not behind a proxy.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  ssr: true,
  compatibilityDate: "2026-03-11",
});
