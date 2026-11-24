<script setup>
import { useMusicStore } from '../stores/music.js'
const music = useMusicStore()
</script>

<template>
  <header class="navbar">
    <RouterLink to="/songs" class="brand">♫ Playlistify</RouterLink>
    <nav aria-label="Main navigation">
      <RouterLink to="/songs">All Songs</RouterLink>
      <RouterLink to="/playlist">My Playlist ({{ music.playlistCount }})</RouterLink>
    </nav>
  </header>
</template>
