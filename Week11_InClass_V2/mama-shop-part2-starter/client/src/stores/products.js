import { ref } from 'vue'
import { defineStore } from 'pinia'
import { sampleProducts } from '../data/products'
import { apiRequest } from '../services/api'

export const useProductsStore = defineStore('products', () => {
  // Keep the Part 1 products visible until the API fetch succeeds.
  const products = ref(sampleProducts)
  const loading = ref(false)
  const error = ref('')

  // TODO 1A-1C: Replace the local list with an asynchronous API call.\n  // FIRST: Read ProductsView.vue, which calls fetchProducts() on mount\n  // and uses products, loading, and error in the template.
  async function fetchProducts() {
    // TODO 1A: Set loading to true and clear the old error.
    loading.value = true
    error.value = ''

    // TODO 1B: Use await apiRequest('/products') inside try/catch.
    try{
      const fetchedProducts = await apiRequest('/products')
      products.value = fetchedProducts

    }catch(requestError){
      error.value = requestError.message
    } finally {
      loading.value = false
    }

    // TODO 1C: Reset loading to false inside finally.
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  }
})
