import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import OrdersView from '../views/OrdersView.vue'

// TODO 3 (observation): The :id segment is a route parameter.
// TODO 3 (observation): requiresAuth is metadata used by the guard below.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', component: ProductsView },
    { path: '/products/:id', component: ProductDetailView },
    { path: '/cart', component: CartView, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView },
    { path: '/orders', component: OrdersView, meta: { requiresAuth: true } }
  ]
})

// TODO 3 (observation): Read and explain this navigation guard.
// A browser guard is for navigation UX, not backend security.
router.beforeEach((to) => {
  if (!to.meta.requiresAuth) {
    return true
  }

  const auth = useAuthStore()

  if (auth.isLoggedIn) {
    return true
  }

  return {
    path: '/login',
    query: {
      redirect: to.fullPath
    }
  }
})

export default router
