export default defineNuxtConfig({
  app: {
    head: {
      title: 'Extra Spicy Website',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        class: 'dark',
      },
      bodyAttrs: {
        class: 'dark',
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@pinia-orm/nuxt',
    '@vueuse/nuxt',
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
        fontsDir: 'assets/fonts',
        base64: true,
        overwriting: true,
      },
    ],
  ],
  build: {
    transpile: [
      'vue-qr',
      'primevue',
    ],
  },
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/tailwind.css',
  ],
  runtimeConfig: {
    public: {
      apiUrl: '',
      appUrl: ''
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
        autoprefixer: {},
    }
  },
  devtools: {
    enabled: true
  },
  plugins: [
    {
      src: '~/plugins/vue3-particles.ts',
      mode: 'client',
    },
  ],
  ssr: false,
});
