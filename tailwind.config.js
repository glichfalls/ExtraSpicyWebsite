module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  plugins: [
    require('@formkit/themes/tailwindcss'),
  ],
  theme: {
    corePlugins: ['margin'],
    extend: {
        colors: {
            primary: {
              DEFAULT: '#3f51b5',
              dark: '#303f9f',
              500: '#3f51b5',
              300: '#7986cb',
            },
            secondary: '#f50057',
            tertiary: '#ff9800',
            success: '#4caf50',
        }
    },
    screens: {
      xs: { max: "340px" },
      sm: { max: "540px" },
      md: { max: "800px" },
      lg: { max: "1280px" },
    },
  }
};
