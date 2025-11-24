<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Página No Encontrada</h2>
    <p>Lo sentimos, la ruta que intentas acceder no existe en esta aplicación.</p>
    
    <router-link to="/" class="home-link">Volver al Catálogo</router-link>
  </div>
</template>

<script setup>
// No requiere lógica
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}
h1 {
  font-size: 6em;
  color: #CC0000;
  margin: 0;
  letter-spacing: 5px;
}
h2 {
  font-size: 2em;
  color: #333;
  margin-bottom: 30px;
}
p {
    color: #666;
    margin-bottom: 30px;
    font-size: 1.2em;
}
.home-link {
  display: inline-block;
  padding: 12px 25px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.home-link:hover {
    background-color: #0056b3;
}
</style>