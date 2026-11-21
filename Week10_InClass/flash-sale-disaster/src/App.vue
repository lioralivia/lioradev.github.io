<script setup>
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'
import CartSummary from './components/CartSummary.vue'
const product = { id: 1, name: 'Cat Ear Headphones', price: 50 }
const items = ref([])
function addToCart(selected) {
  const existing = items.value.find(item => item.id === selected.id)
  if (existing) existing.quantity += 1
  else items.value.push({ ...selected, quantity: 1 })
}
</script>

<template>
  <main>
    <h1>Flash Sale Disaster</h1>
    <p>Can you test this shopping cart before the sale goes live?</p>
    <div class="layout">
      <ProductCard 
        :product="product" 
        @add-to-cart="addToCart" />
      <CartSummary :items="items" />
    </div>
  </main>
</template>

<style>
body {
  font-family:system-ui,sans-serif;
  background:#f8fafc;
  color:#172033;
  margin:0
}

main {
  max-width:850px;
  margin:45px auto;
  padding:20px
}

.layout {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px
}

.product,section {
  padding:22px;
  background:white;
  border:1px solid #ddd;
  border-radius:12px
}

button {
  background:#2563eb;
  color:white;
  border:0;
  border-radius:6px;
  padding:10px 14px;
  cursor:pointer;
  margin:8px 0
}

input {
  padding:8px;
  margin:8px
}

@media(max-width:600px) {
  .layout{
    grid-template-columns:1fr
  }
}
</style>
