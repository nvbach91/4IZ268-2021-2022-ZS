<template>
  <router-link
    v-if="episode"
    class="podcast-box"
    :to="{
      name: 'episode-detail',
      params: {
        episodeId: episode.id
      }
    }"
  >
    <img
      src="/images/logo.png"
      class="podcast-box__image"
      alt=""
    >
    <div class="podcast-box__content">
      <div>
        <span
          v-if="episode.serialNumber"
          class="podcast-box__episode-number"
        >
          {{ episode.serialNumber }}
        </span>
        <span class="podcast-box__date">({{ dateFormat(episode.publishedAt) }})</span>
      </div>
      <div class="podcast-box__title">
        {{ episode.title }}
      </div>
    </div>
  </router-link>

  <div
    v-else
    class="podcast-box podcast-box--skeleton"
    style="height: 118px"
  >
    <div class="podcast-box__image" />
    <div class="podcast-box__content">
      <div class="podcast-box__episode-number" />
      <div class="podcast-box__title" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useFilters } from "@/composables/filters";
import PodcastEpisode from "@/entitites/PodcastEpisode";

export default defineComponent({
  name: 'EpisodeBox',
  props: {
    episode: {
      type: Object as PropType<PodcastEpisode>,
      default: null
    }
  },
  setup() {
    const { dateFormat } = useFilters()

    return {
      dateFormat
    }
  }
});
</script>
