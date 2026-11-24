<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cart = useCartStore()

// TODO 3: Route parameters are strings. Convert the ID to a number.
const product = computed(() => {
  const productId = Number(route.params.id)

  return productsStore.products.find((item) => {
    return item.id === productId
  })
})

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <RouterLink to="/products">← Back to Products</RouterLink>

  <p v-if="productsStore.loading">Loading...</p>
  <p v-else-if="productsStore.error" class="error">{{ productsStore.error }}</p>

  <div v-else-if="product">
    <h1>{{ product.title }}</h1>
    <p>${{ product.price.toFixed(2) }}</p>
    <p>{{ product.description }}</p>

    <button @click="cart.addToCart(product)">
      Add to cart
    </button>
  </div>

  <p v-else>Product not found.</p>
</template>
