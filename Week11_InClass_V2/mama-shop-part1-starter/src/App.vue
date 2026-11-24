<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <!-- The navbar remains visible while RouterView changes pages. -->
  <NavBar />

  <main>
    <RouterView />
  </main>
</template>
