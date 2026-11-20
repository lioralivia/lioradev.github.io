<script setup>
// TODO Part D: define props: ticket (Object), quantity (Number), canIncrease (Boolean).
// TODO Part D: declare 'change-quantity' and 'remove' custom events.
const props = defineProps({
  ticket: Object,
  quantity: Number,
  canIncrease: Boolean
})
const emit = defineEmits(['change-quantity', 'remove'])
</script>

<template>
  <div class="card"><div class="card-body">
    <!-- TODO Part D: show category name, quantity, and subtotal. -->
     <p>{{ ticket.name }} {{ quantity }} = {{ ticket.price*quantity }}</p>
    <strong>Booking item</strong>
    <button @click="emit('change-quantity', ticket.id, '+1')" :disabled="!canIncrease">+</button>
    <button @click="emit('change-quantity', ticket.id, '-1')">-</button>
    <button @click="emit('remove', ticket.id)">remove</button>
    <!-- TODO Part D: add - and + buttons that emit 'change-quantity'
         with ticket.id and -1 or +1; disable + if !canIncrease. -->
    <!-- TODO Part D: add a Remove button emitting 'remove' with ticket.id. -->
  </div></div>
</template>
