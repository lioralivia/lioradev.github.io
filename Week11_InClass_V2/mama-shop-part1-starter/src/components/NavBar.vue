<script setup>
import { useCartStore } from '../stores/cart'

// The cart count reacts to updates made in ProductCard and CartView.
const cart = useCartStore()
</script>

<template>
  <header>
    <strong>Mama Shop</strong>

    <nav>
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/cart">Cart ({{ cart.itemCount }})</RouterLink>
    </nav>
  </header>
</template>
