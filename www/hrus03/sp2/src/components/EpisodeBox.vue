<template>
  <router-link
      v-if="episode"
      class="podcast-box"
      :to="{
      name: 'episode-detail',
      params: {episodeId: episode.id},
    }"
      @click="onEpisodeDetail"
  >
    <EpisodeFavoriteButton :episodeId="episode.id"/>
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
        <template v-if="titleHighlight">
          <span>{{ titleHighlight.before }}</span>
          <span class="podcast-box__title-highlight">{{ titleHighlight.highlight }}</span>
          <span>{{ titleHighlight.after }}</span>
        </template>
        <template v-else>
          {{ episode.title }}
        </template>
      </div>
    </div>
  </router-link>

  <div
      v-else
      class="podcast-box podcast-box--skeleton"
      style="height: 118px"
  >
    <div class="podcast-box__image skeleton"/>
    <div class="podcast-box__content">
      <div class="podcast-box__episode-number skeleton"/>
      <div class="podcast-box__title skeleton"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {useFilters} from "@/composables/filters";
import PodcastEpisode from "@/entitites/PodcastEpisode";
import usePodcast from "@/composables/podcast";
import EpisodeFavoriteButton from "@/components/EpisodeFavoriteButton.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'EpisodeBox',
  components: {EpisodeFavoriteButton},
  props: {
    episode: {
      type: Object as PropType<PodcastEpisode>,
      default: null
    },
    highlight: {
      type: String,
      default: null,
    }
  },
  setup(props) {
    const {dateFormat} = useFilters()
    const {openEpisodeDetail} = usePodcast()

    const titleHighlight = computed(() => {
      let title = props.episode.title

      if (props.highlight) {
        const indexOf = title.toLowerCase().indexOf(props.highlight.toLowerCase())
        if (indexOf >= 0) {
          const beforeHighlight = title.substring(0, indexOf)
          const highlight = title.substring(indexOf, indexOf + props.highlight.length)
          const afterHighlight = title.substring(indexOf + props.highlight.length)

          return {
            before: beforeHighlight,
            highlight,
            after: afterHighlight
          }
        }
      }

      return null
    })

    const onEpisodeDetail = () => {
      openEpisodeDetail(props.episode)
    }

    return {
      dateFormat,
      onEpisodeDetail,
      titleHighlight
    }
  }
});
</script>
