import { $axios } from "@/axios";
import { ApiFetchEpisodesInputType } from "@/types/api/ApiFetchEpisodesInputType";
import { ApiFetchEpisodesResponseType } from "@/types/api/ApiFetchEpisodesResponseType";
import { ApiPodcastEpisodeType } from "@/types/api/ApiPodcastEpisodeType";
import { ApiFetchStatsResponseType } from "@/types/api/ApiFetchStatsResponseType";
import { ApiFetchEpisodeResponseType } from "@/types/api/ApiFetchEpisodeResponseType";

export async function apiFetchEpisodes(params: ApiFetchEpisodesInputType = {}): Promise<ApiFetchEpisodesResponseType> {
  const { data } = await $axios.get<ApiFetchEpisodesResponseType>('episodes', { params });
  return data;
}

export async function apifetchStats(): Promise<ApiFetchStatsResponseType> {
  const { data } = await $axios.get<ApiFetchStatsResponseType>('episode/stats');
  return data;
}

export async function apiFetchEpisode(id: ApiPodcastEpisodeType["id"]): Promise<ApiFetchEpisodeResponseType> {
  const { data } = await $axios.get<ApiFetchEpisodeResponseType>(`episode/${id}`);
  return data;
}
