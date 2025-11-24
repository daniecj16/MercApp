// frontend/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'// <-- Asegúrate de importar el router

const app = createApp(App)

app.use(router) // <-- Monta el router
app.mount('#app')