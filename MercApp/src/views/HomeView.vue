<template>
  <div class="home">
    <h2>Catálogo de Productos</h2>
    
    <div class="controls">
      <input 
        type="text" 
        v-model="searchText" 
        placeholder="Buscar producto por nombre o descripción..." 
        class="search-input"
      />
      
      <select v-model="selectedCategory" class="category-select">
        <option value="">Todas las Categorías</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <p v-if="loading">Cargando productos...</p>
    <p v-else-if="error" class="error-msg">Error al cargar productos: {{ error }}</p>

    <div v-else class="product-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product._id" 
        :product="product" 
        @added-to-cart="handleAddToCart"
      />
      
      <p v-if="filteredProducts.length === 0" class="no-results">
        No se encontraron productos que coincidan con los filtros.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useApi } from '@/composables/useApi'; 
import { useCart } from '@/composables/useCart'; 
import ProductCard from '@/components/ProductCard.vue'; 

// --- Estado local para filtros (Tarea 6) ---
const searchText = ref('');
const selectedCategory = ref('');

// --- Consumo de API (Tarea 8) ---
// Obtener productos (GET /api/products)
const { data: products, loading, error, fetchData: fetchProducts } = useApi('/products');
// Obtener categorías (GET /api/categories)
const { data: categories, fetchData: fetchCategories } = useApi('/categories');

// --- Lógica del Carrito (Tarea 11) ---
const { addItem } = useCart();

// --- Tarea 6: Propiedad Computada (Filtrado y Búsqueda) ---
const filteredProducts = computed(() => {
  if (!products.value) return [];
  
  return products.value.filter(product => {
    
    // 1. Búsqueda por Texto (nombre o descripción)
    const searchLower = searchText.value.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                          (product.description && product.description.toLowerCase().includes(searchLower));
    
    // 2. Filtro por Categoría
    const matchesCategory = selectedCategory.value === '' || 
                            // Verifica si el ID de la categoría del producto coincide con el filtro
                            (product.categoryId && product.categoryId._id === selectedCategory.value);
    
    return matchesSearch && matchesCategory;
  });
});

// --- Lógica de Montaje y Carga Inicial ---
onMounted(() => {
  // Cargar productos y categorías al iniciar la vista
  fetchProducts();
  fetchCategories();
});

// --- Manejo de Evento de Componente Hijo (Tarea 7: Comunicación por eventos) ---
const handleAddToCart = (product) => {
  addItem(product); // Llama a la lógica del carrito
  console.log(`Producto ${product.name} añadido al carrito.`);
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
.controls {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten en pantallas pequeñas */
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
}
.search-input {
  flex-grow: 1;
  min-width: 200px; /* Asegura que no se haga demasiado pequeño */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.category-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  min-width: 150px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}
.error-msg {
    color: #CC0000;
    font-weight: bold;
    text-align: center;
    padding: 20px;
    border: 1px solid #FFCCCC;
    background-color: #FFF0F0;
    border-radius: 5px;
}
.no-results {
    grid-column: 1 / -1; /* Ocupa todo el ancho de la cuadrícula */
    text-align: center;
    padding: 30px;
    color: #666;
    font-size: 1.1em;
}
</style>