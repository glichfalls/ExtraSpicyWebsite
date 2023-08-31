export default defineNuxtConfig({
  app: {
    head: {
      title: 'Extra Spicy Website',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@pinia/nuxt',
    '@pinia-orm/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
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
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.scss',
  ],
  runtimeConfig: {
    public: {
      apiUrl: '',
      appUrl: ''
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
    {
      src: '~/plugins/primevue.ts',
      mode: 'client',
    }
  ],
  i18n: {
    experimental: {
      jsTsFormatResource: true,
    },
    defaultLocale: 'en',
    langDir: 'lang/',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      }
    ]
  },
  ssr: false,
});
