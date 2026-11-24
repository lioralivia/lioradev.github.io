<script setup>
import { useCartStore } from '../stores/cart'

// ProductCard receives a product from ProductsView via props.
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// The card and navbar access the SAME Pinia cart store.
const cart = useCartStore()
</script>

<template>
  <article class="card">
    <h3>{{ product.title }}</h3>
    <p>Price: ${{ product.price.toFixed(2) }}</p>

    <!-- TODO 1 in cart.js: This button calls the action students implement. -->
    <button @click="cart.addToCart(props.product)">
      Add to cart
    </button>
  </article>
</template>
