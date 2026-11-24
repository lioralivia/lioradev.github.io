import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import CartView from '../views/CartView.vue'

// TODO 4: Study the route mapping. No new code is required in Part 1.
// RouterView in App.vue renders whichever view matches the URL.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', component: ProductsView },
    { path: '/cart', component: CartView }
  ]
})

export default router
