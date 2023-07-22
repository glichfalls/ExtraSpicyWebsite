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
          'Permanent Marker': true,
        },
        display: 'swap',
        prefetch: false,
        preconnect: false,
        preload: true,
        download: true,
        base64: true,
        overwriting: true,
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
      'ag-grid-vue',
    ],
  },
  devtools: {
    enabled: true
  },
  ssr: false,
});
