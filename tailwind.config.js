module.exports = {
  content: [
    './tailwind-theme.js',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require('@formkit/themes/tailwindcss'),
    require('flowbite/plugin'),
  ],
  theme: {
    extend: {
        colors: {
            primary: {
              DEFAULT: '#3f51b5',
              500: '#3f51b5',
            },
            secondary: '#f50057',
            tertiary: '#ff9800',
            success: '#4caf50',
        }
    }
  }
};
