import { ref, computed, watch } from 'vue';

// Función para inicializar el estado desde localStorage
const initCart = () => {
  const savedCart = localStorage.getItem('mercapp_cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Estado del carrito: array de { product, quantity }
const cartItems = ref(initCart());

// Observar cambios en cartItems y guardarlos en localStorage
watch(cartItems, (newItems) => {
  localStorage.setItem('mercapp_cart', JSON.stringify(newItems));
}, { deep: true });


export function useCart() {

  // Tarea 11: Total Calculado (computed)
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  });

  // Tarea 11: Agregar items
  const addItem = (product) => {
    const existingItem = cartItems.value.find(item => item.product._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({ product, quantity: 1 });
    }
  };

  // Tarea 11: Quitar items
  const removeItem = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.product._id !== productId);
  };

  // Tarea 11: Actualizar cantidad
  const updateQuantity = (productId, newQuantity) => {
    const item = cartItems.value.find(item => item.product._id === productId);
    if (item) {
      // Asegurar que la cantidad sea >= 1, o eliminar si es 0
      if (newQuantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = newQuantity;
      }
    }
  };

  return {
    cartItems,
    cartTotal,
    addItem,
    removeItem,
    updateQuantity,
  };
}