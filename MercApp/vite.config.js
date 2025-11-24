import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // ESTO ES LO CRUCIAL: Define el alias '@' para que apunte a la carpeta 'src'
      '@': fileURLToPath(new URL('./src', import.meta.url)) 
    }
  }
});