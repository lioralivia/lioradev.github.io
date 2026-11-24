import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'mama_shop_cart'

  function loadCart(){
    try{
      const savedText = localStorage.getItem(STORAGE_KEY)

      if (savedText === null){
        return []
      }

      const savedItems = JSON.parse(savedText)

      if(Array.isArray(savedItems)){
        return savedItems
      }
      return []
    } catch (error){
      console.error("unable to restore saved cart: ", error)
      return []
    }
  }

  function saveCart(cartItems){
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems)
    )
  }

// Mama Shop Part 1: Complete TODO 1, 2, 3, and 5 (in that order) in this file.
// See student-guide.md for the matching step numbers.
export const useCartStore = defineStore('cart', () => {
  // Already provided: a reactive array for shopping cart items.
  // Each item will have productId, title, price, and qty.
  const items = ref(loadCart())

  // =============================================================
  // TODO 1A-1C: Make the "Add to cart" button work.
  //
  // BEFORE coding:
  // 1. Open ProductsView.vue and locate ProductCard.
  // 2. Open ProductCard.vue and find @click="cart.addToCart(...)".
  // 3. Return here to implement the action called by that button.
  // =============================================================
  function addToCart(product) {
    // TODO 1A: Find a cart item whose productId equals product.id.

    // TODO 1B: If the item exists, increase its qty by one.

    // TODO 1C: Otherwise, push a new cart item containing
    // productId, title, price, and qty: 1.
    const existingItem = items.value.find((item) =>{
      return item.productId === product.id
    })

    if (existingItem){
      existingItem.qty += 1
    } else{
      items.value.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        qty : 1
      })
    }
  }

  // =============================================================
  // TODO 2A-2C: Calculate values used by the interface.
  //
  // BEFORE coding:
  // - NavBar.vue displays cart.itemCount.
  // - CartView.vue displays cart.totalPrice and checks cart.isEmpty.
  // - These computed getters derive values from items, so they
  //   update when TODO 1 changes the cart.
  // =============================================================
  const itemCount = computed(() => {
    // TODO 2A: Sum item.qty using a for...of loop.
    let count = 0
    for (const item of items.value){
      count += item.qty
    }
    return count
  })

  const totalPrice = computed(() => {
    // TODO 2B: Sum item.price * item.qty.
    let total = 0
    for (const item of items.value){
      total += item.qty * item.price
    }
    return total
  })

  const isEmpty = computed(() => {
    // TODO 2C: Return true only when the array is empty.
    return items.value.length === 0
  })

  // =============================================================
  // TODO 3: Implement cart editing actions.
  // =============================================================
  function removeFromCart(productId) {
    // TODO 3A: Use filter() to keep every OTHER product.
    items.value = items.value.filter((item)=> {
      return item.productId !== productId
    })
  }

  function increaseQty(productId) {
    // TODO 3B: Find the item; if it exists, increase qty.
    const item = items.value.find((cartItem) => {
      return cartItem.productId === productId
    })

    if (item){
      item.qty += 1
    }
  }

  function decreaseQty(productId) {
    // TODO 3C: Find the item and decrease qty.
    // If qty reaches zero, call removeFromCart(productId).
    const item = items.value.find((cartItem) => {
      return cartItem.productId === productId
    })

    if(!item){
      return
    }
    item.qty-= 1
    if (item.qty <= 0){
      removeFromCart(productId)
    }
  }

  function clearCart() {
    // TODO 3D: Replace items.value with an empty array.
    items.value = []
  }

  // =============================================================
  // TODO 5: Persistence (AFTER the cart buttons work).
  // 5A: Import watch from Vue; define STORAGE_KEY and loadCart()
  //     ABOVE defineStore(). Initialize items with ref(loadCart()).
  // 5B: Define saveCart(cartItems) ABOVE defineStore().
  // 5C: Add watch(items, callback, { deep: true }) HERE.
  // =============================================================
  watch(
    items,
    (updatedItems) => {
      saveCart (updatedItems)
    },
    {deep : true}
  )
  // Already provided: public interface used by the UI.
  return {
    items,
    itemCount,
    totalPrice,
    isEmpty,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  }
})
