import { PodcastEpisodeTypeEnum } from "@/types/PodcastEpisodeTypeEnum";

export interface ApiFetchEpisodesInputType {
  page?: number,
  search?: string,
  type?: PodcastEpisodeTypeEnum,
}
