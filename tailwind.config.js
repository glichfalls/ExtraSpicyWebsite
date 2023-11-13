module.exports = {
  content: [
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: 'class',
  theme: {
    corePlugins: ['margin'],
  }
};
