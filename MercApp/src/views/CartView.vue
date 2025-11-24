<template>
  <div class="cart-view">
    <h2>🛍️ Carrito de Compras</h2>
    <p v-if="cartItems.length === 0">Tu carrito está vacío.</p>
    <div v-else>
      <div v-for="item in cartItems" :key="item.product._id" class="cart-item">
        <img :src="item.product.imageUrl" alt="item.product.name" class="cart-image"/>
        <div class="item-details">
          <h4>{{ item.product.name }}</h4>
          <p>Precio unitario: ${{ item.product.price.toFixed(2) }}</p>
        </div>
        <div class="item-controls">
          <label>Cantidad:
            <input 
              type="number" 
              :value="item.quantity" 
              @change="e => updateQuantity(item.product._id, parseInt(e.target.value))" 
              min="1"
            />
          </label>
          <button @click="removeItem(item.product._id)">Quitar</button>
        </div>
        <p class="item-subtotal">Subtotal: ${{ (item.product.price * item.quantity).toFixed(2) }}</p>
      </div>

      <div class="cart-summary">
        <h3>Total: ${{ cartTotal.toFixed(2) }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart';

// Usar el composable del carrito
const { cartItems, cartTotal, removeItem, updateQuantity } = useCart();
</script>