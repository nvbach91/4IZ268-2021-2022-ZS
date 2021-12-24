import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import EpisodesPage from "@/pages/EpisodesPage.vue";
import EpisodeDetailPage from "@/pages/EpisodeDetailPage.vue";

const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'episodes', path: '/episodes/:type?', component: EpisodesPage },
  { name: 'episode-detail', path: '/episode/:episodeId', component: EpisodeDetailPage },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   if (to.name === from.name) {
//     // console.log(router.currentRoute);
//     // router.currentRoute.value.query.test = 'test'
//     await router.replace({ query: to.query })
//     next(false)
//   } else {
//     next()
//   }
// })
