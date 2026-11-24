import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '../services/api'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const loading = ref(false)
  const error = ref('')

  // TODO 5A-5C: Retrieve protected order history.\n  // FIRST: Read OrdersView.vue to see how fetchOrders(),\n  // orders, loading, and error are used.
  async function fetchOrders(token) {
    // TODO 5A: Set loading=true; clear the old error.
    try{
      const fetchedOrders = await apiRequest('/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      orders.value = fetchedOrders
    } catch (requestError) {
      error.value = requestError.message
    } finally {
      loading.value = false
    }
    // TODO 5B: GET /orders with Authorization: Bearer token.
    // Assign the response to orders.value.

    // TODO 5C: Handle errors and reset loading in finally.
  }

  return {
    orders,
    loading,
    error,
    fetchOrders
  }
})
