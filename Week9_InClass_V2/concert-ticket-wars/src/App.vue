<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import TicketCard from './components/TicketCard.vue'
import BookingItem from './components/BookingItem.vue'

const STORAGE_KEY = 'concert-ticket-wars-bookings-v1'
const MAX_TICKETS = 4
const tickets = [
  { id: 1, name: 'VIP Soundcheck', price: 350, capacity: 5 },
  { id: 2, name: 'Standing Pen', price: 220, capacity: 10 },
  { id: 3, name: 'Category 1', price: 180, capacity: 15 },
  { id: 4, name: 'Category 2', price: 120, capacity: 20 }
]
const bookings = ref([]) // [{ ticketId: 1, quantity: 2 }]
const message = ref('')

// TODO Part E: calculate totalQuantity and totalCost using computed().
const totalQuantity = computed(() => {
  let total = 0;
  bookings.value.forEach(booking => {
    total += booking.quantity;
  })
  return total
})
const totalCost = computed(() => {
  let total = 0;
  bookings.value.forEach(booking => {
    const ticket = tickets.find(t => t.id == booking.ticketId)
    total += booking.quantity*ticket.price
  })
  return total
})

// TODO Part D: return booking records combined with their ticket information.
const bookingDetails = computed(() =>
  bookings.value.map(booking => ({
    ticketId: booking.ticketId,
    ticket: tickets.find(t => t.id === booking.ticketId),
    quantity: booking.quantity
  }))
)

// TODO Part C: implement bookedQuantity(ticketId) and remaining(ticket).
function bookedQuantity(ticketId){
  const booking = bookings.value.find(b => b.ticketId === ticketId)
  return booking ? booking.quantity : 0
}
function remaining(ticket) {
  return ticket.capacity - bookedQuantity(ticket.id);
}

// TODO Part B: enforce the four-ticket limit and available inventory.
// Add one ticket to bookings, or increase its existing quantity.
function addTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId)
  if (totalQuantity.value >= MAX_TICKETS) {
    message.value = `Maximum ${MAX_TICKETS} tickets per customer.`
    return
  }
  if (remaining(ticket) <= 0) {
    message.value = `${ticket.name} is sold out.`
    return
  }
  message.value = ''
  const booking = bookings.value.find(b => b.ticketId === ticketId)
  if (booking) booking.quantity++
  else bookings.value.push({ ticketId, quantity: 1 })
}

// TODO Part D: change the quantity (+1 or -1), removing a booking at zero.
function changeQuantity(ticketId, change) {
  if (change > 0) return addTicket(ticketId)
  const booking = bookings.value.find(b => b.ticketId === ticketId)
  if (!booking) return
  if (booking.quantity <= 1) removeBooking(ticketId)
  else booking.quantity--
}

function removeBooking(ticketId) {
  bookings.value = bookings.value.filter(booking => booking.ticketId !== ticketId);
}
function resetBookings() {
  bookings.value = []
  message.value = 'All bookings cleared.'
}

// TODO Part F: load saved bookings in onMounted().
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const parsed = JSON.parse(saved)
    bookings.value.push(...parsed)
  }
})

// TODO Part F: watch bookings (deep: true) and save to localStorage.
watch(
  bookings,
  (newBookings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookings))
  },
  { deep: true }
)
</script>

<template>
  <main class="container py-4">
    <h1>🎤 Concert Ticket Wars</h1>
    <p class="text-muted">The Ultimate Ticket Drop! Maximum {{ MAX_TICKETS }} tickets per customer.</p>
    <div v-if="message" class="alert alert-info" role="status">{{ message }}</div>
    <h2 class="h4 mt-4">Available Tickets</h2>
    <div class="row g-3">
      <div v-for="ticket in tickets" :key="ticket.id" class="col-md-6">
        <!-- TODO Part A: pass props and listen for the book event. -->
        <TicketCard :ticket="ticket" :remaining="remaining(ticket)" :at-limit="totalQuantity >= MAX_TICKETS" @book="addTicket">
          <template #message><span v-if="remaining(ticket) <= 2 && remaining(ticket) > 0" class="text-danger">Selling fast!</span></template>
        </TicketCard>
      </div>
    </div>
    <h2 class="h4 mt-4">Your Bookings ({{ totalQuantity }}/{{ MAX_TICKETS }})</h2>
    <p v-if="bookingDetails.length === 0">No tickets booked yet.</p>
    <div v-for="item in bookingDetails" :key="item.ticketId" class="mb-2">
      <!-- TODO Part D: implement BookingItem's props and emitted events. -->
      <BookingItem :ticket="item.ticket" :quantity="item.quantity" :can-increase="totalQuantity < MAX_TICKETS && remaining(item.ticket) > 0" @change-quantity="changeQuantity" @remove="removeBooking" />
    </div>
    <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
      <strong>Total: S${{ totalCost.toFixed(2) }}</strong>
      <button class="btn btn-outline-secondary" :disabled="totalQuantity === 0" @click="resetBookings">Clear Bookings</button>
    </div>
  </main>
</template>
