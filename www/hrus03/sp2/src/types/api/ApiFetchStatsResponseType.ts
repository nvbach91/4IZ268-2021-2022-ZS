import { ApiPodcastEpisodeType } from "@/types/api/ApiPodcastEpisodeType";

export interface ApiFetchStatsResponseType {
  solved_episodes_count: number;
  unsolved_episodes_count: number;
  bonus_episodes_count: number;
  latest_episode: ApiPodcastEpisodeType;
}
