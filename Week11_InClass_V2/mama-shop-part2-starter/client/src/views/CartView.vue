<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

const busy = ref(false)
const error = ref('')

async function checkout() {
  busy.value = true
  error.value = ''

  try {
    await cart.checkout(auth.token)
    router.push('/orders')
  } catch (checkoutError) {
    error.value = checkoutError.message
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <h1>Your Cart</h1>

  <p v-if="cart.isEmpty">Your cart is empty.</p>

  <div v-for="item in cart.items" :key="item.productId" class="card row">
    <strong>{{ item.title }}</strong>
    <span>${{ item.price.toFixed(2) }} each</span>
    <button @click="cart.decreaseQty(item.productId)">-</button>
    <span>Qty: {{ item.qty }}</span>
    <button @click="cart.increaseQty(item.productId)">+</button>
    <button @click="cart.removeFromCart(item.productId)">Remove</button>
  </div>

  <h3>Total: ${{ cart.totalPrice.toFixed(2) }}</h3>
  <p v-if="error" class="error">{{ error }}</p>

  <button v-if="!cart.isEmpty" :disabled="busy" @click="checkout">
    {{ busy ? 'Checking out...' : 'Checkout' }}
  </button>

  <button v-if="!cart.isEmpty" @click="cart.clearCart()">
    Clear cart
  </button>
</template>
