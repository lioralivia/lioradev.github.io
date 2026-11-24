<script setup>
import { onMounted } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { useAuthStore } from '../stores/auth'

const orders = useOrdersStore()
const auth = useAuthStore()

// TODO 5: fetchOrders() needs the token for the protected API.
onMounted(() => {
  orders.fetchOrders(auth.token)
})
</script>

<template>
  <h1>My Orders</h1>

  <p v-if="orders.loading">Loading orders...</p>
  <p v-if="orders.error" class="error">{{ orders.error }}</p>
  <p v-if="!orders.loading && !orders.error && orders.orders.length === 0">
    No orders yet.
  </p>

  <article v-for="order in orders.orders" :key="order.id" class="card">
    <h3>Order #{{ order.id }}</h3>
    <p>Created: {{ order.createdAt }}</p>
    <p>Total: ${{ order.total.toFixed(2) }}</p>

    <ul>
      <li v-for="item in order.items" :key="item.productId">
        {{ item.title }}: ${{ item.price.toFixed(2) }} × {{ item.qty }}
      </li>
    </ul>
  </article>
</template>
