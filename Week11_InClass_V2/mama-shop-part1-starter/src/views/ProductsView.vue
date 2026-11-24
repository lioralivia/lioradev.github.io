<script setup>
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

// Part 1 uses a local product list; Part 2 replaces it with an API call.
const productsStore = useProductsStore()
</script>

<template>
  <h1>Products</h1>

  <p v-if="productsStore.loading">Loading products...</p>
  <p v-if="productsStore.error" class="error">{{ productsStore.error }}</p>

  <div class="grid">
    <ProductCard
      v-for="product in productsStore.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
