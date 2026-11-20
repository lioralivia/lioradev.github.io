<script setup>
// TODO Part 2: Declare a required Object prop called cat.
const props = defineProps({
  cat: Object
})
const emit = defineEmits(['feed'])
// TODO Part 4: Declare a 'feed' event and emit the cat ID on click.
</script>
<template>
  <div class="card h-100 shadow-sm"><div class="card-body text-center">
    <!-- TODO Part 2: Display cat emoji, name, and hunger percentage. -->
     <p>{{ cat.emoji }} {{ cat.name }} - {{ cat.hunger }}%</p>
    <!-- TODO Part 4: Add a Feed Me button; disable when hunger is 0. -->
     <button :disabled="cat.hunger == 0" @click="emit('feed', cat.id)">Feed Me</button>
    <!-- TODO Part 5: Add a named slot called message. -->
     <slot name="message"><br>Fed by {{ cat.feedings }}%</slot>
  </div></div>
</template>
