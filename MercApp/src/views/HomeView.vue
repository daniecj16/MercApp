<template>
  <div class="home">
    <h2 class="title">🛒 Catálogo de Productos</h2>
    
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

    <p v-if="loading" class="loading-msg">Cargando productos...</p>
    <p v-else-if="error" class="error-msg">❌ Error al cargar productos: {{ error }}</p>

    <div v-else class="product-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product._id" 
        :product="product" 
        @added-to-cart="handleAddToCart"
      />
      
      <p v-if="filteredProducts.length === 0" class="no-results">
        😢 No se encontraron productos que coincidan con los filtros.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// Asumo la existencia de estos composables en '@/composables/'
import { useApi } from '@/composables/useApi'; 
import { useCart } from '@/composables/useCart'; 
import ProductCard from '@/components/ProductCard.vue'; 

// --- 1. Estado local para filtros (Tarea 6) ---
const searchText = ref('');
const selectedCategory = ref('');

// --- 2. Consumo de API usando useApi (Tarea 8) ---
// Obtener productos (GET /api/products)
const { data: products, loading, error, fetchData: fetchProducts } = useApi('/products');
// Obtener categorías (GET /api/categories)
const { data: categories, fetchData: fetchCategories } = useApi('/categories');

// --- 3. Lógica del Carrito (Tarea 11) ---
const { addItem } = useCart();

// --- 4. Propiedad Computada (Reactividad y Filtros) ---
const filteredProducts = computed(() => {
  if (!products.value) return [];
  
  return products.value.filter(product => {
    
    // 1. Búsqueda por Texto (nombre o descripción)
    const searchLower = searchText.value.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                          (product.description && product.description.toLowerCase().includes(searchLower));
    
    // 2. Filtro por Categoría
    const matchesCategory = selectedCategory.value === '' || 
                            // Compara el ID del filtro con el ID referenciado en el producto
                            (product.categoryId && product.categoryId._id === selectedCategory.value);
    
    return matchesSearch && matchesCategory; // Debe cumplir ambas condiciones
  });
});

// --- 5. Lógica de Montaje y Carga Inicial ---
onMounted(() => {
  fetchProducts();
  fetchCategories();
});

// --- 6. Manejo de Evento de Componente Hijo ---
const handleAddToCart = (product) => {
  addItem(product); // Llama a la lógica del carrito (useCart)
  console.log(`Producto ${product.name} añadido al carrito.`);
};
</script>

<style scoped>
/* Estilos basados en tu referencia, ajustados para claridad */
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}
.controls {
  display: flex;
  flex-wrap: wrap; 
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 8px;
}
.search-input, .category-select {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}
.loading-msg, .error-msg, .no-results {
  text-align: center;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
}
.error-msg {
  color: #CC0000;
  background-color: #FFF0F0;
  border: 1px solid #FFCCCC;
}
</style>