<script setup>
import { ref, computed } from 'vue'
import { calculateSubtotal, calculateTotal } from '../lib/cart.js'

const props = defineProps({ items: { type: Array, required: true } })
const code = ref('')
const appliedCode = ref('')

const subtotal = computed(() => calculateSubtotal(props.items))

const total = computed(() => calculateTotal(props.items, appliedCode.value))

const discountMessage = computed(() => 
  appliedCode.value.toUpperCase() === 'SAVE10' ? '10% discount applied' : appliedCode.value ? 'Invalid discount code' : ''
)

function applyDiscount() { 
  appliedCode.value = code.value.trim() 
}
</script>

<template>
  <section aria-label="Shopping cart">
    <h2>Shopping Cart</h2>
    <p v-if="items.length === 0">Your cart is empty</p>
    <ul v-else>
      <li v-for="item in items" :key="item.id">{{ item.name }} x {{ item.quantity }}</li>
    </ul>
    <p>Subtotal: ${{ subtotal.toFixed(2) }}</p>
    <label for="discount">Discount code</label>
    <input id="discount" v-model="code" placeholder="Enter code" />
    <button type="button" @click="applyDiscount">Apply Discount</button>
    <p role="status">{{ discountMessage }}</p>
    <p data-testid="total">Total: ${{ total.toFixed(2) }}</p>
  </section>
</template>
