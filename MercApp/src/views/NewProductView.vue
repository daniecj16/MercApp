<template>
  <div class="product-form-view">
    <h2>{{ isEditing ? '✏️ Editar Producto' : '✨ Nuevo Producto' }}</h2>
    
    <p v-if="loadingInitialData">Cargando datos del producto...</p>
    
    <form @submit.prevent="handleSubmit" class="product-form" v-else>
      
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="form.name" required />
      
      <label for="price">Precio:</label>
      <input 
        type="number" 
        id="price" 
        v-model.number="form.price" 
        min="0.01" 
        step="0.01" 
        required 
        :class="{ 'invalid': !isPriceValid }"
      />
      <p v-if="!isPriceValid" class="error-msg">El precio debe ser un número mayor a 0.</p>
      
      <label for="description">Descripción:</label>
      <textarea id="description" v-model="form.description"></textarea>
      
      <label for="category">Categoría:</label>
      <select id="category" v-model="form.categoryId" required :class="{ 'invalid': !isCategoryValid }">
        <option value="" disabled>-- Selecciona una Categoría --</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
      </select>
      <p v-if="!isCategoryValid" class="error-msg">La categoría es obligatoria.</p>

      <label for="stock">Stock:</label>
      <input 
        type="number" 
        id="stock" 
        v-model.number="form.stock" 
        min="0" 
        required 
        :class="{ 'invalid': !isStockValid }"
      />
      <p v-if="!isStockValid" class="error-msg">El stock debe ser un número mayor o igual a 0.</p>

      <label for="imageUrl">URL de Imagen:</label>
      <input 
        type="text" 
        id="imageUrl" 
        v-model="form.imageUrl" 
        :class="{ 'invalid': !isImageValid }" 
        placeholder="/uploads/mi-imagen.png"
      />
      <p v-if="!isImageValid" class="error-msg">El formato de la URL de imagen es inválido.</p>

      <img v-if="form.imageUrl" :src="form.imageUrl" alt="Vista previa" class="image-preview">
      
      <button type="submit" :disabled="!isFormValid || loadingSubmit">
        {{ loadingSubmit ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto') }}
      </button>
      
      <p v-if="error" class="error-msg submission-error">Error: {{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApi } from '@/composables/useApi';

const router = useRouter();
const route = useRoute();
const isEditing = computed(() => !!route.params.id);

// --- Estados ---
const categories = ref([]);
const loadingInitialData = ref(true); // Para cargar categorías y datos de edición
const loadingSubmit = ref(false);
const error = ref(null);

const form = reactive({
  name: '',
  price: 0.01,
  description: '',
  categoryId: '',
  stock: 0,
  imageUrl: ''
});

// --- Tarea 9: Propiedades Computadas para Validación ---
const isPriceValid = computed(() => form.price > 0);
const isStockValid = computed(() => form.stock >= 0);
const isCategoryValid = computed(() => !!form.categoryId);

// Validación de URL de imagen (simple regex para extensiones comunes)
const isImageValid = computed(() => {
  if (!form.imageUrl) return true; // Campo opcional/puede ser vacío
  // Verifica si termina en extensión común
  return form.imageUrl.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
});

const isFormValid = computed(() => {
  return form.name && form.name.trim().length > 0 &&
         isPriceValid.value && 
         isCategoryValid.value && 
         isStockValid.value && 
         isImageValid.value;
});

// --- Lógica de Carga Inicial ---
onMounted(async () => {
  const { data: catData, fetchData: fetchCategories } = useApi('/categories');
  await fetchCategories();
  categories.value = catData.value || [];

  if (isEditing.value) {
    // Cargar datos del producto a editar
    const { data: productData, fetchData: fetchProduct } = useApi(`/products/${route.params.id}`);
    await fetchProduct();
    
    if (productData.value) {
      // Llenar el formulario con los datos existentes
      Object.assign(form, {
        name: productData.value.name,
        price: productData.value.price,
        description: productData.value.description,
        categoryId: productData.value.categoryId._id, // Usar el ID
        stock: productData.value.stock,
        imageUrl: productData.value.imageUrl || ''
      });
    } else {
        error.value = "No se pudo cargar el producto para edición. ID inválido.";
    }
  }
  loadingInitialData.value = false;
});

// --- Lógica de Envío del Formulario (POST/PUT) ---
const handleSubmit = async () => {
  if (!isFormValid.value) return;
  
  loadingSubmit.value = true;
  error.value = null;
  
  const method = isEditing.value ? 'PUT' : 'POST';
  const endpoint = isEditing.value ? `/products/${route.params.id}` : '/products';
  
  const { data: responseData, error: apiError, fetchData: sendData } = useApi(endpoint);

  try {
    // La imagen no se maneja aquí directamente como FormData porque la tarea pide 'imageUrl'
    // Se envía como JSON
    await sendData({
      method: method,
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(form)
    });
    
    if (apiError.value) {
        throw new Error(apiError.value);
    }

    // Redireccionar al catálogo
    router.push('/'); 

  } catch (e) {
    error.value = `Error al guardar el producto: ${e.message}`;
  } finally {
    loadingSubmit.value = false;
  }
};
</script>

<style scoped>
/* Estilos básicos para el formulario */
.product-form-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.product-form label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
.product-form input[type="text"],
.product-form input[type="number"],
.product-form select,
.product-form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.product-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
.product-form button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
.invalid {
  border-color: red !important;
}
.error-msg {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
.image-preview {
    max-width: 100px;
    max-height: 100px;
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 5px;
}
</style>