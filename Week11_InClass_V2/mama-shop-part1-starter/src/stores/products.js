import { ref } from 'vue'
import { defineStore } from 'pinia'
import { sampleProducts } from '../data/products'

// The product list is local in Part 1. We will use an API in Part 2.
export const useProductsStore = defineStore('products', () => {
  const products = ref(sampleProducts)
  const loading = ref(false)
  const error = ref('')

  return {
    products,
    loading,
    error
  }
})
