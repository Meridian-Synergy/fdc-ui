import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Config Vite partagée. Storybook (vue3-vite) la merge → garantit que le plugin
// Vue transforme bien les .vue dans le build de la preview.
export default defineConfig({
  plugins: [vue()],
})
