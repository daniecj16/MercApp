<template>
  <div class="product-card">
    <router-link :to="{ name: 'ProductDetail', params: { id: product._id } }" class="product-link">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3>{{ product.name }}</h3>
    </router-link>

    <p class="price">${{ product.price ? product.price.toFixed(2) : '0.00' }}</p>
    <p class="category">{{ product.categoryId ? product.categoryId.name : 'Sin Categoría' }}</p>

    <button 
      @click="addToCart" 
      :disabled="product.stock === 0"
    >
      {{ product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock' }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Tarea 7: Define la prop 'product' (objeto)
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Tarea 7: Define el evento 'added-to-cart'
const emit = defineEmits(['added-to-cart']);

const addToCart = () => {
  // Emitir el evento, pasando el objeto del producto al componente padre (HomeView)
  emit('added-to-cart', props.product);
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.product-link {
  text-decoration: none;
  color: inherit;
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}
h3 {
  font-size: 1.2em;
  margin: 10px 0 5px 0;
  color: #333;
}
.price {
  font-size: 1.1em;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 10px;
}
button {
  background-color: #007BFF;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover:not(:disabled) {
  background-color: #0056b3;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>