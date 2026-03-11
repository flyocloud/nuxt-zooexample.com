// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  modules: [["@flyo/nitro-nuxt", {
    apiToken: process.env.FLYO_API_TOKEN,
    liveEdit: process.env.FLYO_LIVE_EDIT === "true",
    registerPageRoutes: true,
    defaultPageRoute: "cms",
  }]],
  ssr: true
});
