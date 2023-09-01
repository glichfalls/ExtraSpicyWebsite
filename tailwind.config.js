module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
    "./theme/**/*.{js,ts}",
  ],
  plugins: [
    require('@formkit/themes/tailwindcss'),
  ],
  darkMode: 'class',
  theme: {
    corePlugins: ['margin'],
    extend: {
        colors: {
            primary: {
              DEFAULT: '#3f51b5',
              dark: '#303f9f',
              900: '#303f9f',
              500: '#3f51b5',
              300: '#7986cb',
            },
            secondary: '#f50057',
            tertiary: '#ff9800',
            success: '#4caf50',
        }
    },
  }
};
