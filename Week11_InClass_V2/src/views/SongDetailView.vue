<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMusicStore } from '../stores/music.js'

const route = useRoute()
const music = useMusicStore()

// TODO 5: Read the route parameter, convert it to a number, and find the song.
// See the student instructions for the reference approach.
const song = computed(() => {
  // TODO: find song from route.params.id
  const songId = parseInt(route.params.id)
  const songs = music.songs
  return songs.find(song => song.id === songId)
})
</script>

<template>
  <section>
    <RouterLink to="/songs" class="back-link">← Back to All Songs</RouterLink>
    <div v-if="song" class="detail">
      <div class="detail-art" aria-hidden="true">{{ song.emoji }}</div>
      <h1>{{ song.title }}</h1>
      <p class="muted">{{ song.artist }}</p>
      <p>{{ song.genre }} · {{ song.duration }}</p>
      <button type="button" @click="music.togglePlaylist(song.id)">
        {{ music.isInPlaylist(song.id) ? 'Remove from Playlist' : 'Add to Playlist' }}
      </button>
    </div>
    <p v-else class="empty">Song not found.</p>
  </section>
</template>
