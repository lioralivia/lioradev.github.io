import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '../services/api'

// Browser storage is separate from Pinia's reactive state.
const STORAGE_KEY = 'mama_shop_cart'

// Part 1 TODO 5A (completed): Restore a previously saved cart.
function loadCart() {
  try {
    const savedText = localStorage.getItem(STORAGE_KEY)

    if (savedText === null) {
      return []
    }

    const savedItems = JSON.parse(savedText)

    if (Array.isArray(savedItems)) {
      return savedItems
    }

    return []
  } catch (error) {
    // Invalid JSON should not prevent the application from starting.
    console.warn('Unable to restore saved cart:', error)
    return []
  }
}

// Part 1 TODO 5B (completed): Store arrays as JSON strings.
function saveCart(cartItems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
}

export const useCartStore = defineStore('cart', () => {
  // STATE: each item has productId, title, price, and qty.
  const items = ref(loadCart())

  // Part 1 TODO 2 (completed): Computed getters derive values from cart state.
  const itemCount = computed(() => {
    let count = 0

    for (const item of items.value) {
      count += item.qty
    }

    return count
  })

  const totalPrice = computed(() => {
    let total = 0

    for (const item of items.value) {
      total += item.price * item.qty
    }

    return total
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  // Part 1 TODO 1 (completed): Add a product or increment its quantity.
  function addToCart(product) {
    const existingItem = items.value.find((item) => {
      return item.productId === product.id
    })

    if (existingItem) {
      existingItem.qty += 1
    } else {
      items.value.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        qty: 1
      })
    }
  }

  // Part 1 TODO 3 (completed): Cart editing actions.
  function removeFromCart(productId) {
    items.value = items.value.filter((item) => {
      return item.productId !== productId
    })
  }

  function increaseQty(productId) {
    const item = items.value.find((cartItem) => {
      return cartItem.productId === productId
    })

    if (item) {
      item.qty += 1
    }
  }

  function decreaseQty(productId) {
    const item = items.value.find((cartItem) => {
      return cartItem.productId === productId
    })

    if (!item) {
      return
    }

    item.qty -= 1

    if (item.qty <= 0) {
      removeFromCart(productId)
    }
  }

  function clearCart() {
    items.value = []
  }

  // Part 1 TODO 5C (completed): Watch nested qty changes as well as array replacements.
  watch(
    items,
    (updatedItems) => {
      saveCart(updatedItems)
    },
    { deep: true }
  )


  // =============================================================
  // Part 2 TODO 4: Send the cart to the protected orders API.
  // 1. POST /orders with the Authorization: Bearer token header.
  // 2. Send JSON containing { items: items.value }.
  // 3. Only clear the cart AFTER the API confirms success.
  // 4. Return the created order to the caller.
  // =============================================================
  async function checkout(token) {
    // TODO 4A: Call apiRequest('/orders', { ... }).
    const createdOrder = await apiRequest('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        items: items.value
      })
    })
    // TODO 4B: Clear the cart only after success.
    clearCart()
    // TODO 4C: Return the order.
    return createdOrder
  }

  // Expose every property used by views or components.
  return {
    items,
    itemCount,
    totalPrice,
    isEmpty,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    checkout
  }
})
