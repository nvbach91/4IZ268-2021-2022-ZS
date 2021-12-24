import { PodcastEpisodeTypeEnum } from "@/types/PodcastEpisodeTypeEnum";
import { ApiPodcastEpisodeType } from "@/types/api/ApiPodcastEpisodeType";

export default class PodcastEpisode {
  content?: string;
  description?: string;
  duration: number;
  id: string;
  publishedAt: string;
  serialNumber: string;
  title: string;
  type: PodcastEpisodeTypeEnum;

  constructor(episode: ApiPodcastEpisodeType) {
    this.content = episode.content
    this.description = episode.description
    this.duration = episode.duration
    this.id = episode.id
    this.publishedAt = episode.published_at
    this.type = episode.type

    const dashIndex = episode.title.indexOf('-')
    this.title = episode.title.substring(dashIndex + 1).trim()
    this.serialNumber = episode.title.substring(0, dashIndex - 1).trim()
  }
}
