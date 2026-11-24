<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/products')
}
</script>

<template>
  <header>
    <strong>Mama Shop</strong>

    <nav>
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/cart">Cart ({{ cart.itemCount }})</RouterLink>
      <RouterLink v-if="auth.isLoggedIn" to="/orders">Orders</RouterLink>

      <template v-if="auth.isLoggedIn">
        <span>Hello, {{ auth.user.username }}</span>
        <button @click="logout">Logout</button>
      </template>

      <RouterLink v-else to="/login">Login</RouterLink>
    </nav>
  </header>
</template>
