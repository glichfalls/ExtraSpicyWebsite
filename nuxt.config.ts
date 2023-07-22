export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Inter': true,
        },
        display: 'swap',
        prefetch: false,
        preconnect: false,
        preload: true,
        download: true,
        base64: true,
      },
    ],
    'nuxt-icon',
  ],
  runtimeConfig: {
    public: {
      apiUrl: '',
      appUrl: ''
    }
  },
  build: {
    transpile: [
      'vue-qr',
    ],
  },
  devtools: {
    enabled: true
  },
  ssr: false,
});
