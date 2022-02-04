import { PodcastEpisodeTypeEnum } from "@/types/PodcastEpisodeTypeEnum";

export interface ApiPodcastEpisodeType {
  id: number
  title: string
  type: PodcastEpisodeTypeEnum
  serial_number: string
  published_at: string
  duration: number
  description?: string
  content?: string
}

