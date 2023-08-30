export default defineNuxtConfig({
  app: {
    head: {
      title: 'Extra Spicy Website',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      bodyAttrs: {
        class: 'dark',
      }
    }
  },
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
        fontsDir: 'assets/fonts',
        base64: true,
        overwriting: true,
      },
    ],
    'nuxt-icon',
    '@invictus.codes/nuxt-vuetify',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/css/main.css',
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
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'custom',
        themes: {
          custom: {
            dark: true,
            colors: {
              primary: '#3f51b5',
              secondary: '#ff9800',
              accent: '#607d8b',

            },
          }
        }
      }
    },
    moduleOptions: {
      treeshaking: true,
      useIconCDN: false,
      styles: {
        configFile: 'assets/css/vuetify.scss',
      },
      autoImport: true,
      useVuetifyLabs: true,
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
