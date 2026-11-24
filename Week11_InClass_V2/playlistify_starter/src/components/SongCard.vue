<script setup>
import { useMusicStore } from '../stores/music.js'

const props = defineProps({
  song: { type: Object, required: true }
})
const music = useMusicStore()
</script>

<template>
  <article class="song-card">
    <div class="art" aria-hidden="true">{{ props.song.emoji }}</div>
    <div class="song-info">
      <RouterLink class="song-title" :to="`/songs/${props.song.id}`">{{ props.song.title }}</RouterLink>
      <p>{{ props.song.artist }} · {{ props.song.genre }} · {{ props.song.duration }}</p>
    </div>
    <button type="button" @click="music.togglePlaylist(props.song.id)">
      {{ music.isInPlaylist(props.song.id) ? 'Remove' : 'Add +' }}
    </button>
  </article>
</template>
