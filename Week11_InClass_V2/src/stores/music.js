import { ref, computed, watch } from 'vue'
// TODO 6: requires 'watch" from vue
import { defineStore } from 'pinia'
import { sampleSongs } from '../data/songs.js'

export const useMusicStore = defineStore('music', () => {
  const songs = ref(sampleSongs)
  // TODO 2: Create a ref named playlistIds, initially an empty array
    function restore() {
    let data = localStorage.getItem('playlistify_playlist')
    if (data){
      data = JSON.parse(data)
    } else{
      return []
    }
    return data
  }
  const playlistIds = ref(restore()) // TODO: complete state initialization
  

  // TODO 6A: Restore the saved playlist from localStorage.
  // 1. Use localStorage.getItem('playlistify_playlist').
  // 2. If saved data exists, convert the JSON string into an array.
  // 3. Otherwise, start with an empty array.
  // 4. Use the resulting array to initialize playlistIds.

  // TODO 3: Return true if songId is in playlistIds.
  function isInPlaylist(songId) {
    // TODO: replace with membership check
    const check = playlistIds.value.find(playlist => playlist === songId)
    if (check){
      return true
    }
    return false
  }

  // TODO 3: Add the ID if absent; otherwise remove it.
  function togglePlaylist(songId) {
    // TODO: implement add/remove behavior
    try{
      if (isInPlaylist(songId)){
        playlistIds.value = playlistIds.value.filter((id) => {
          return id !== songId
        })
      }else {
        playlistIds.value.push(songId)
      }
    } catch (error){
      console.error("failed to modify songs" + error.message)
    }
  }

  // TODO 4: Create a computed array of songs whose IDs are saved.
  const playlistSongs = computed(() => {
    let result = []
    playlistIds.value.forEach((playlist => {
      let song = sampleSongs.find(song => song.id === playlist.id)
      if (song){
        result.push (song)
      }
    }))
    return result // TODO: return saved song objects
  })

  // TODO 4: Create a computed count of saved IDs.
  const playlistCount = computed(() => {
    let result = 0
    for (let playlist of playlistIds.value){
      result += 1
    }
    return result// TODO: return number of saved songs
  })

  // TODO 6B: Automatically save playlist changes to localStorage.
  // 1. Use watch() to observe playlistIds.
  // 2. Whenever playlistIds changes, convert it into a JSON string.
  // 3. Save the JSON string using localStorage.setItem().
  // 4. Use the key 'playlistify_playlist'.
  // 5. Make sure changes made by push() are detected.
watch(playlistIds, (newplaylistIds) =>{
  localStorage.setItem('playlistify_playlist', JSON.stringify(newplaylistIds))
}, {deep: true})

  return {
    songs,
    playlistIds,
    isInPlaylist,
    togglePlaylist,
    playlistSongs,
    playlistCount
  }
})
