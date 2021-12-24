import { ref } from "vue";
import { apiFetchEpisode, apiFetchEpisodes, apiFetchLatestEpisode } from "@/api/api";
import { ApiFetchEpisodesInputType } from "@/types/api/ApiFetchEpisodesInputType";
import { ApiFetchEpisodeInputType } from "@/types/api/ApiFetchEpisodeInputType";
import PodcastEpisode from "@/entitites/PodcastEpisode";

const latestEpisode = ref<PodcastEpisode>();

export default function usePodcast() {
  const isLoading = ref(false)

  const toggleLoader = (value: boolean) => {
    isLoading.value = value
  }

  const fetchEpisodes = async (
    params: ApiFetchEpisodesInputType = {
      page: 1
    }
  ): Promise<{
    episodes: PodcastEpisode[],
    total: number
  }> => {
    console.log({ params })
    toggleLoader(true)
    try {
      const { episodes, total } = await apiFetchEpisodes(params)
      return {
        episodes: episodes.map(episode => new PodcastEpisode(episode)),
        total,
      }
    } catch (e) {
      console.error({ e })
      return {
        episodes: [],
        total: 0
      }
    } finally {
      toggleLoader(false)
    }
  }

  const fetchLatestEpisode = async () => {
    try {
      const episode = await apiFetchLatestEpisode()
      latestEpisode.value = new PodcastEpisode(episode)
    } catch (e) {
      console.error({ e })
    }
  }

  const fetchEpisode = async (id: ApiFetchEpisodeInputType["id"]) => {
    try {
      const episode = await apiFetchEpisode(id)
      return new PodcastEpisode(episode)
    } catch (e) {
      console.error({ e })
    }
  }

  return {
    latestEpisode,
    fetchEpisodes,
    fetchLatestEpisode,
    fetchEpisode,
    isLoading,
  }
}
