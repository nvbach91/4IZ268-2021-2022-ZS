<template>
  <div
    v-if="episodeId"
    class="episode-star far fa-star"
    :class="{active: isActive}"
    @click.prevent.stop="toggleFavoriteEpisode"
  >
    <span
      v-if="showLabel"
      class="episode-star__label"
      v-text="isActive ? 'Označeno jako oblíbené' : 'Označit jako oblíbené'"
    />
  </div>
</template>

<script lang="ts">
import {  defineComponent  } from 'vue';
import { useFavoriteEpisodes } from "@/composables/favoriteEpisodes";

export default defineComponent({
  name: 'EpisodeFavoriteButton',
  props: {
    episodeId: {
      type: Number,
      required: true,
    },
    showLabel: Boolean,
  },
  setup(props) {
    const { isActive, toggleFavoriteEpisode } = useFavoriteEpisodes(props.episodeId?.toString())

    return {
      isActive,
      toggleFavoriteEpisode,
    }
  }
});
</script>
