<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="shell">
    <NavBar />
    <main class="content">
      <RouterView />
    </main>
    <footer>Playlistify · A Vue Router + Pinia learning exercise · No audio playback</footer>
  </div>
</template>
