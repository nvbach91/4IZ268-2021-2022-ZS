import { ApiPodcastEpisodeType } from "@/types/api/ApiPodcastEpisodeType";

export interface ApiFetchEpisodesResponseType {
  episodes: ApiPodcastEpisodeType[]
  total: number
}
