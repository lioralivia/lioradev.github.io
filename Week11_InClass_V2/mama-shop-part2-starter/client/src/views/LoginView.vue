<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const username = ref('student')
const password = ref('demo')

onMounted(() => {
  if (auth.isLoggedIn) {
    router.replace('/products')
  }
})

async function submit() {
  const loginSucceeded = await auth.login(username.value, password.value)

  if (!loginSucceeded) {
    return
  }

  // After login, return to the protected page originally requested.
  const destination = typeof route.query.redirect === 'string'
    ? route.query.redirect
    : '/products'

  router.push(destination)
}
</script>

<template>
  <h1>Login</h1>

  <form @submit.prevent="submit">
    <div class="row">
      <label>Username <input v-model="username" required /></label>
    </div>

    <div class="row">
      <label>Password <input v-model="password" type="password" required /></label>
    </div>

    <p v-if="auth.error" class="error">{{ auth.error }}</p>

    <button :disabled="auth.loading">
      {{ auth.loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>

  <p class="muted">Demo only: any nonempty username and password.</p>
</template>
