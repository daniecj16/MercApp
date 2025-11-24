<template>
  <div class="product-detail-view">
    <p v-if="loading">Cargando detalle del producto...</p>
    <p v-else-if="error" class="error-msg">Error: {{ error }}</p>
    
    <div v-else-if="product" class="detail-container">
      <img :src="product.imageUrl" :alt="product.name" class="detail-image" />
      
      <div class="info-section">
        <h2>{{ product.name }}</h2>
        <p class="category-tag">Categoría: {{ product.categoryId ? product.categoryId.name : 'N/A' }}</p>
        <p class="price-large">${{ product.price.toFixed(2) }}</p>
        
        <p class="description">{{ product.description }}</p>

        <div class="stock-info" :class="{ 'out-of-stock': product.stock === 0 }">
          Stock: **{{ product.stock }}** unidades
        </div>

        <button @click="handleAddToCart" :disabled="product.stock === 0">
          {{ product.stock > 0 ? 'Añadir al Carrito' : 'Agotado' }}
        </button>

        <router-link :to="{ name: 'NewProduct', params: { id: product._id } }" class="edit-link">
          Editar Producto
        </router-link>
      </div>
    </div>
    <p v-else class="error-msg">Producto no encontrado.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '@/composables/useApi';
import { useCart } from '@/composables/useCart';

const route = useRoute();
const { addItem } = useCart();

const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const productId = route.params.id;
  
  const { data, loading: apiLoading, error: apiError, fetchData } = useApi(`/products/${productId}`);
  loading.value = apiLoading.value;
  
  await fetchData();
  
  loading.value = apiLoading.value;
  error.value = apiError.value;
  product.value = data.value;
});

const handleAddToCart = () => {
    if (product.value) {
        addItem(product.value);
    }
};
</script>

<style scoped>
/* Estilos para el detalle */
.detail-container {
    display: flex;
    gap: 40px;
    max-width: 900px;
    margin: 40px auto;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 8px;
    background-color: white;
}
.detail-image {
    width: 40%;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
}
.info-section {
    width: 60%;
}
.price-large {
    font-size: 2.5em;
    font-weight: bold;
    color: #4CAF50;
    margin: 10px 0;
}
.category-tag {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 20px;
}
.stock-info {
    margin: 20px 0;
    padding: 10px;
    background-color: #e6ffe6;
    border: 1px solid #4CAF50;
    border-radius: 4px;
}
.out-of-stock {
    background-color: #ffcccc;
    border-color: #cc0000;
    color: #cc0000;
    font-weight: bold;
}
.error-msg {
    color: red;
    text-align: center;
}
.edit-link {
    display: inline-block;
    margin-left: 20px;
    color: #007BFF;
}
</style>