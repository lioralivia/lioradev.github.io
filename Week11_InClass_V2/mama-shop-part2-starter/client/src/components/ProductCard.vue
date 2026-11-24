<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()
</script>

<template>
  <article class="card">
    <!-- Part 2 TODO 3 (observation): This RouterLink includes the product ID in the URL. -->
    <h3>
      <RouterLink :to="`/products/${product.id}`">
        {{ product.title }}
      </RouterLink>
    </h3>

    <p>Price: ${{ product.price.toFixed(2) }}</p>

    <button @click="cart.addToCart(props.product)">
      Add to cart
    </button>
  </article>
</template>
