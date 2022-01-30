import { ref } from "vue";
import { apiFetchEpisode, apiFetchEpisodes, apifetchStats } from "@/api/api";
import { ApiFetchEpisodesInputType } from "@/types/api/ApiFetchEpisodesInputType";
import { ApiFetchEpisodeInputType } from "@/types/api/ApiFetchEpisodeInputType";
import PodcastEpisode from "@/entitites/PodcastEpisode";

const episodeDetail = ref<{
  episode?: PodcastEpisode,
  previousEpisode?: PodcastEpisode|null,
  nextEpisode?: PodcastEpisode|null,
}>({});
const stats = ref<{
  latestEpisode?: PodcastEpisode,
  solvedCasesCount: number,
  unsolvedCasesCount: number,
  bonusCasesCount: number,
}>({
  solvedCasesCount: 0,
  unsolvedCasesCount: 0,
  bonusCasesCount: 0,
});

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

  const fetchStats = async () => {
    try {
      const result = await apifetchStats()
      stats.value = {
        solvedCasesCount: result.solved_episodes_count,
        unsolvedCasesCount: result.unsolved_episodes_count,
        bonusCasesCount: result.bonus_episodes_count,
        latestEpisode: new PodcastEpisode(result.latest_episode),
      }
    } catch (e) {
      console.error({ e })
    }
  }

  const fetchEpisode = async (id: ApiFetchEpisodeInputType["id"]) => {
    toggleLoader(true)
    if (!id) return
    try {
      const result = await apiFetchEpisode(id)
      episodeDetail.value = {
        episode: new PodcastEpisode(result.episode),
        previousEpisode: result.previous_episode && new PodcastEpisode(result.previous_episode),
        nextEpisode: result.next_episode && new PodcastEpisode(result.next_episode),
      }
    } catch (e) {
      console.error({ e })
    } finally {
      toggleLoader(false)
    }
  }

  const openEpisodeDetail = (episode: PodcastEpisode) => {
    episodeDetail.value.episode = episode
    episodeDetail.value.nextEpisode = null
    episodeDetail.value.previousEpisode = null
  }

  return {
    episodeDetail,
    stats,
    fetchEpisodes,
    fetchStats,
    fetchEpisode,
    isLoading,
    openEpisodeDetail
  }
}
