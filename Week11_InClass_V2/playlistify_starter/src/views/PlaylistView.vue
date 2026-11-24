<script setup>
import { useMusicStore } from '../stores/music.js'
import SongCard from '../components/SongCard.vue'

const music = useMusicStore()
</script>

<template>
  <section>
    <h1>My Playlist</h1>
    <p class="muted">Your saved songs appear here, even after navigating between pages.</p>
    <p v-if="music.playlistSongs.length === 0" class="empty">
      Your playlist is empty. <RouterLink to="/songs">Browse songs</RouterLink> to add some.
    </p>
    <div v-else class="song-list">
      <SongCard v-for="song in music.playlistSongs" :key="song.id" :song="song" />
    </div>
  </section>
</template>
