import { computed, ref } from "vue";

const favoriteEpisodesKey = 'favoriteEpisodes'
const favoriteEpisodes = ref([])

const fetchFavoriteEpisodes = () => {
  const data = JSON.parse(localStorage.getItem(favoriteEpisodesKey) ?? '[]')
  favoriteEpisodes.value = Array.isArray(data) ? data : []
}

const storeFavoriteEpisodes = () => {
  localStorage.setItem(favoriteEpisodesKey, JSON.stringify(favoriteEpisodes.value))
}

fetchFavoriteEpisodes()

export const useFavoriteEpisodes = (episodeId) => {
  const isActive = computed(() => favoriteEpisodes.value.includes(episodeId))
  const toggleFavoriteEpisode = () => {
    if (isActive.value) {
      favoriteEpisodes.value = favoriteEpisodes.value.filter(item => item !== episodeId)
    } else {
      favoriteEpisodes.value = [
        ...favoriteEpisodes.value,
        episodeId
      ]
    }

    storeFavoriteEpisodes()
  }

  return {
    toggleFavoriteEpisode,
    isActive
  }
}
