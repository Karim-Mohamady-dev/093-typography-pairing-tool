const react = require('@vitejs/plugin-react').default
const tailwindcss = require('@tailwindcss/vite').default
const { defineConfig } = require('vite')

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [react(), tailwindcss()],
})
