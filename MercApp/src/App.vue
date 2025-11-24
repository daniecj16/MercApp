<template>
  <header>
    <nav class="main-nav">
      <router-link to="/">Catálogo</router-link> |
      <router-link to="/product/new">Crear Producto</router-link> |
      <router-link to="/cart">
        Carrito ({{ totalItemsInCart }}) </router-link> |
      <router-link to="/about">Acerca de</router-link>
    </nav>
  </header>

  <main class="main-content">
    <Suspense>
      <router-view />
      
      <template #fallback>
        <div class="loading-fallback">
          Cargando contenido, por favor espere...
        </div>
      </template>
    </Suspense>
  </main>

  <footer class="app-footer">
    <p>&copy; 2025 MercApp - Catálogo de Productos</p>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useCart } from '@/composables/useCart'; // Importamos el composable del carrito (Tarea 11)

// Usamos el composable para acceder al estado reactivo del carrito
const { cartItems } = useCart();

// Propiedad computada para mostrar la cantidad total de items en el carrito (reactividad)
const totalItemsInCart = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});
</script>

<style>
/* Estilos globales básicos */
body {
  font-family: sans-serif;
  margin: 0;
  background-color: #f4f4f4;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-nav {
  background-color: #333;
  padding: 15px;
  text-align: center;
}
.main-nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
}
.main-nav a.router-link-active {
  color: #4CAF50; /* Color distintivo para la ruta activa */
}
.main-content {
  flex-grow: 1;
  padding: 20px;
}
.loading-fallback {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #666;
}
.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: auto;
}
</style>