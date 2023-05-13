// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"], // add
  modules: [["@flyodev/nitrocms-nuxt", {
    apiToken: process.env.NODE_ENV !== 'production' ? 'DEV_TOKEN' : 'PRODUCTION_TOKEN'
  }]],
});
