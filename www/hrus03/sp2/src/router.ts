import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import EpisodesPage from "@/pages/EpisodesPage.vue";
import EpisodeDetailPage from "@/pages/EpisodeDetailPage.vue";
import AboutPodcastPage from "@/pages/AboutPodcastPage.vue";
import AboutUsPage from "@/pages/AboutUsPage.vue";
import RecommendedPage from "@/pages/RecommendedPage.vue";
import RequestPage from "@/pages/RequestPage.vue";

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
  },
  {
    name: 'episodes',
    path: '/episodes/:type?',
    component: EpisodesPage,
  },
  {
    name: 'episode-detail',
    path: '/episode/:episodeId',
    component: EpisodeDetailPage,
    meta: {
      forceScrollTop: true,
    }
  },
  {
    name: 'about-podcast',
    path: '/about-podcast',
    component: AboutPodcastPage,
  },
  {
    name: 'about-us',
    path: '/about-us',
    component: AboutUsPage,
  },
  {
    name: 'recommended',
    path: '/recommended/:type?',
    component: RecommendedPage,
  },
  {
    name: 'request',
    path: '/request',
    component: RequestPage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (to.name !== from.name || to.meta.forceScrollTop) {
      return { top: 0 }
    }
  },
})
