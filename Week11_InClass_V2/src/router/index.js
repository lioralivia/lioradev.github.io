import { createRouter, createWebHistory } from 'vue-router'
import SongsView from '../views/SongsView.vue'
import PlaylistView from '../views/PlaylistView.vue'
import SongDetailView from '../views/SongDetailView.vue'

const routes = [
  // TODO 1: Add redirect / -> /songs.
  // { path: '/', redirect: '/songs' },
  {path : "/", redirect: "/songs"},
  // TODO 1: Add /songs -> SongsView.
  {path : "/songs", component: () => import("../views/SongsView.vue")},
  // { path: '/songs', component: SongsView },
  // TODO 1: Add /playlist -> PlaylistView.
  {path : "/playlist", component: () => import("../views/PlaylistView.vue")},
  // { path: '/playlist', component: PlaylistView },
  // TODO 1: Add /songs/:id -> SongDetailView.
  {path : "/songs/:id", component: () => import("../views/SongDetailView.vue")},
  // { path: '/songs/:id', component: SongDetailView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
