import { $axios } from "@/axios";
import { ApiFetchEpisodesInputType } from "@/types/api/ApiFetchEpisodesInputType";
import { ApiFetchEpisodesResponseType } from "@/types/api/ApiFetchEpisodesResponseType";
import { ApiPodcastEpisodeType } from "@/types/api/ApiPodcastEpisodeType";
import { ApiFetchEpisodeInputType } from "@/types/api/ApiFetchEpisodeInputType";

export async function apiFetchEpisodes(params: ApiFetchEpisodesInputType = {}): Promise<ApiFetchEpisodesResponseType> {
  const { data } = await $axios.get<ApiFetchEpisodesResponseType>('episodes', { params });
  return data;
}

export async function apiFetchLatestEpisode(): Promise<ApiPodcastEpisodeType> {
  const { data } = await $axios.get<ApiPodcastEpisodeType>('episode/latest');
  return data;
}

export async function apiFetchEpisode(id: ApiPodcastEpisodeType["id"]): Promise<ApiPodcastEpisodeType> {
  const { data } = await $axios.get<ApiPodcastEpisodeType>(`episode/${id}`);
  return data;
}
