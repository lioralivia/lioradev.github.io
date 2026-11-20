<script setup>
// TODO Part A: define props: ticket (Object), remaining (Number), atLimit (Boolean).
const props = defineProps({
  ticket: Object,
  remaining: Number,
  atLimit: Boolean
})
// TODO Part B: declare the 'book' custom event.
const emit = defineEmits(['book'])
</script>

<template>
  <div class="card h-100"><div class="card-body">
    <!-- TODO Part A: show ticket name, price, remaining inventory, SOLD OUT state. -->
    <h3 class="h5">{{ ticket.name }}</h3>
    <p>Price: {{ ticket.price }}</p>
    <p>Availability: {{ remaining }}</p>
    <p v-if="remaining <= 0" class="text-danger fw-bold">SOLD OUT</p>
    <!-- TODO Part G: render the named 'message' slot. -->
    <slot name="message"></slot>
    <!-- TODO Part B: disable button when sold out or at four-ticket limit;
         emit 'book' with ticket.id when clicked. -->
    <button class="btn btn-primary" 
  @click="emit('book', ticket.id)" 
  :disabled="remaining <= 0 || atLimit">Book Ticket</button>
  </div></div>
</template>
