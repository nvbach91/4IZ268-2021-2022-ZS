import { ApiPodcastEpisodeType } from "@/types/api/ApiPodcastEpisodeType";

export interface ApiFetchEpisodeResponseType {
  episode: ApiPodcastEpisodeType
  next_episode: ApiPodcastEpisodeType
  previous_episode: ApiPodcastEpisodeType
}
