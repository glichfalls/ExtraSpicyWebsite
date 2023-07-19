// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiUrl: '',
      appUrl: '',
    },
  },
  devtools: {
    enabled: true,
  },
});
