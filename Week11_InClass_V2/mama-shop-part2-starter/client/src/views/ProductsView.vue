<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const productsStore = useProductsStore()

// TODO 1: fetchProducts() loads the list asynchronously.
onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <h1>Products</h1>

  <p v-if="productsStore.loading">Loading products...</p>
  <p v-if="productsStore.error" class="error">{{ productsStore.error }}</p>

  <button
    v-if="productsStore.error"
    @click="productsStore.fetchProducts()"
  >
    Retry
  </button>

  <div class="grid">
    <ProductCard
      v-for="product in productsStore.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
