# Playlistify — Vue Router + Pinia

This is a browser-first, 60–75-minute in-class exercise. All song titles/artists are fictional. No backend or music playback.

## Run

```bash
pnpm install
pnpm dev
```

Open the Vite URL (usually http://localhost:5173).

## Files
- `src/router/index.js`: TODO 1 routes
- `src/stores/music.js`: TODOs 2–4 shared state and actions
- `src/views/SongDetailView.vue`: TODO 5 dynamic route parameter
- `src/views/SongsView.vue`, `PlaylistView.vue`, `src/components/`: supplied UI

## Notes
- Starter intentionally has placeholder behavior; after TODO 1 the pages render, but saving and song details require later TODOs.
- Pinia is installed in `src/main.js`.
- Playlist state is in memory: browser refresh resets it. Route navigation does not.
- No API, authentication, localStorage, or audio playback.
