<script setup>
import { useCartStore } from '../stores/cart'

// Read the same reactive state as the product cards and navbar.
const cart = useCartStore()
</script>

<template>
  <h1>Your Cart</h1>

  <p v-if="cart.isEmpty">Your cart is empty.</p>

  <div
    v-for="item in cart.items"
    :key="item.productId"
    class="card row"
  >
    <strong>{{ item.title }}</strong>
    <span>${{ item.price.toFixed(2) }} each</span>

    <!-- TODO 3: These controls call the cart editing actions. -->
    <button @click="cart.decreaseQty(item.productId)">-</button>
    <span>Qty: {{ item.qty }}</span>
    <button @click="cart.increaseQty(item.productId)">+</button>
    <button @click="cart.removeFromCart(item.productId)">Remove</button>
  </div>

  <h3>Total: ${{ cart.totalPrice.toFixed(2) }}</h3>

  <button v-if="!cart.isEmpty" @click="cart.clearCart()">
    Clear cart
  </button>
</template>
