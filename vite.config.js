import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
      //Pour faire des requêtes parce que c'est pas notre api
      '/api': {
        target: 'https://morpion-api.edu.netlor.fr',
        changeOrigin: true, // Très important pour faire croire au serveur distant que la requête vient de chez lui
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
