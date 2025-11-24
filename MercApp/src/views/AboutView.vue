<template>
  <div class="acerca-view container">
    <div class="card">
      <h2 class="title">Acerca de MercApp: Catálogo Demo</h2>
      <p class="description">
        MercApp es una aplicación de **catálogo de productos y gestión de carrito** construida como demostración de una arquitectura **Full-Stack JavaScript**.
      </p>

      <h3 class="subtitle">Arquitectura y Tecnologías Clave</h3>
      <ul class="features-list">
        <li>
          <strong>Frontend (Cliente):</strong> Desarrollado con el framework **Vue 3** (Composition API) y **Vite** para un desarrollo rápido y eficiente.
        </li>
        <li>
          <strong>Backend (API REST):</strong> Construido con **Node.js** y el framework **Express**, proveyendo las rutas de la API para productos y categorías.
        </li>
        <li>
          <strong>Base de Datos:</strong> **MongoDB** (NoSQL) es usado como capa de persistencia, con **Mongoose** como ORM para definir los esquemas de datos.
        </li>
      </ul>
      
      <h3 class="subtitle">Funcionalidades Implementadas</h3>
      <ul class="features-list">
        <li class="success-item">Catálogo interactivo con filtros y búsqueda.</li>
        <li class="success-item">Gestión de estado del carrito persistente con Local Storage.</li>
        <li class="success-item">Formulario de alta de productos con validación.</li>
        <li class="success-item">Carga perezosa de rutas (Lazy Loading) para optimización.</li>
      </ul>

      <p class="thank-you">¡Gracias por revisar el proyecto!</p>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica de script compleja
</script>

<style scoped>
.acerca-view {
  padding: 30px 20px;
  max-width: 800px;
  margin: 0 auto;
}
.card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.title {
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #34495e;
  margin-bottom: 25px;
}
.subtitle {
  color: #34495e;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 1.3em;
}
.features-list {
  list-style: none;
  padding-left: 0;
}
.features-list li {
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  line-height: 1.5;
}
.success-item::before {
  content: '✓';
  color: #42b983;
  font-weight: bold;
  position: absolute;
  left: 0;
  top: 0;
}
.thank-you {
  text-align: center;
  margin-top: 30px;
  font-style: italic;
  color: #42b983;
}
</style>