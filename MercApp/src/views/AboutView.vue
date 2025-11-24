<template>
  <div class="about">
    <h2>Acerca de MercApp</h2>
    
    <p class="project-info">
      Esta es una aplicación de demostración de un catálogo de productos 
      implementada con Vue 3 (Frontend) y un API REST basada en Node.js/Express (Backend).
    </p>
    
    <div class="features">
      <h3>Funcionalidades Clave:</h3>
      <ul>
        <li>Catálogo interactivo con filtros y búsqueda (Tarea 6).</li>
        <li>Gestión de estado del carrito persistente con Local Storage (Tarea 11).</li>
        <li>Formulario de alta y edición de productos con validación (Tarea 9).</li>
        <li>Carga perezosa de rutas (Lazy Loading) para optimización (Tarea 10).</li>
      </ul>
    </div>
    
    <p class="thanks-msg">¡Gracias por revisar el proyecto!</p>
  </div>
</template>

<script setup>
// No requiere lógica
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 2em;
  border-bottom: 2px solid #4CAF50;
  display: inline-block;
  padding-bottom: 5px;
}
.project-info {
    font-size: 1.1em;
    color: #555;
    margin-bottom: 30px;
}
.features {
    text-align: left;
    margin: 0 auto 30px auto;
    max-width: 500px;
}
.features h3 {
    color: #4CAF50;
    margin-bottom: 15px;
}
.features ul {
    list-style-type: none;
    padding: 0;
}
.features li {
    background: #f0fff0;
    margin-bottom: 8px;
    padding: 10px;
    border-left: 4px solid #4CAF50;
    font-size: 1em;
}
.thanks-msg {
    font-style: italic;
    color: #007BFF;
}
</style>