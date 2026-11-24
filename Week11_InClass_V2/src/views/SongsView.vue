<script setup>
import { useMusicStore } from '../stores/music.js'
import SongCard from '../components/SongCard.vue'

const music = useMusicStore()
</script>

<template>
  <section>
    <h1>All Songs</h1>
    <p class="muted">Browse the library and build your own playlist.</p>
    <div class="song-list">
      <SongCard v-for="song in music.songs" :key="song.id" :song="song" />
    </div>
  </section>
</template>
