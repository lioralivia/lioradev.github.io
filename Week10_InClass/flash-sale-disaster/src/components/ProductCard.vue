<script setup>
const props = defineProps(
  { product: { type: Object, required: true } }
)

const emit = defineEmits(['add-to-cart'])
</script>
<template>
  <article class="product">
    <h2>{{ props.product.name }}</h2>
    <p>Price: ${{ props.product.price.toFixed(2) }}</p>
    <button type="button" @click="emit('add-to-cart', props.product)">Add to Cart</button>
  </article>
</template>
