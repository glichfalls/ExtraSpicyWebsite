const FormKitVariants = require('@formkit/themes/tailwindcss');

module.exports = {
  content: ['./tailwind-theme.js'],
  plugins: [FormKitVariants],
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
