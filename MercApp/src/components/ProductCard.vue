<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      
      <p class="product-price">${{ product.price.toFixed(2) }}</p>
      
      <p v-if="product.categoryId && product.categoryId.name" class="product-category">
        Categoría: {{ product.categoryId.name }}
      </p>
      
      <p :class="['product-stock', { 'low-stock': product.stock < 5 && product.stock > 0, 'out-of-stock': product.stock === 0 }]">
        Stock: {{ product.stock > 0 ? product.stock : 'Agotado' }}
      </p>

      <div class="actions">
        <button 
          @click="$emit('added-to-cart', product)"
          :disabled="product.stock === 0"
          class="btn btn-add-to-cart"
        >
          Añadir
        </button>

        <router-link :to="{ name: 'ProductDetail', params: { id: product._id } }" class="btn btn-view-detail">
          Ver Detalle
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Tarea 7: Define la prop 'product' (Objeto)
defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({ _id: null, name: 'Producto Desconocido', price: 0, stock: 0, imageUrl: '' }) 
  }
});

// Tarea 7: Define el evento que el HomeView escucha
defineEmits(['added-to-cart']); 
</script>

<style scoped>
/* Estilos proporcionados previamente para la tarjeta */
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  background-color: white;
}
.product-card:hover {
  transform: translateY(-5px);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}
.product-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.product-name {
  font-size: 1.25em;
  margin-top: 0;
  margin-bottom: 5px;
  color: #333;
}
.product-price {
  font-size: 1.5em;
  color: #007BFF;
  font-weight: bold;
  margin-bottom: 10px;
}
.product-category {
    font-size: 0.9em;
    color: #6c757d;
    margin-bottom: 5px;
}
.product-stock {
    font-size: 0.9em;
    margin-bottom: 15px;
    color: green;
}
.low-stock {
    color: orange;
    font-weight: bold;
}
.out-of-stock {
    color: red;
    font-weight: bold;
}
.actions {
  margin-top: auto; 
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9em;
  text-decoration: none;
  transition: background-color 0.2s;
}
.btn-add-to-cart {
  background-color: #4CAF50;
  color: white;
  flex-grow: 2;
}
.btn-add-to-cart:hover:not(:disabled) {
  background-color: #45a049;
}
.btn-add-to-cart:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.btn-view-detail {
  background-color: #007BFF;
  color: white;
  flex-grow: 1;
}
.btn-view-detail:hover {
  background-color: #0056b3;
}
</style>