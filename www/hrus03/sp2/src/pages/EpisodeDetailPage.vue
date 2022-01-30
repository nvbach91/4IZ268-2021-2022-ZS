<template>
  <PageTitle
    sm
    :back="{name: 'episodes'}"
  >
    {{ episode?.title }}

    <span
      v-if="isLoading && !episode?.title"
      class="skeleton skeleton--title"
    />
    <small
      class="page-title__small"
    >
      {{ episode?.serialNumber }}
      <span v-if="episode?.publishedAt">({{ dateFormat(episode?.publishedAt) }})</span>
      <span
        v-if="isLoading && (!episode?.serialNumber && !episode?.publishedAt)"
        class="skeleton skeleton--episode-number"
      />
    </small>
  </PageTitle>
  <div class="podcast-detail">
    <div class="container-prose">
      <div
        v-html="episode?.description"
      />
      <div
        v-if="!episode?.description && isLoading"
        class="skeleton skeleton--description"
      />
      <div class="podcast-detail__embed skeleton">
        <iframe
          v-if="episode?.id"
          :key="`episode-${episode?.id}`"
          :src="`https://www.buzzsprout.com/686489/${episode?.id}?iframe=true`"
          scrolling="no"
        />
      </div>

      <div class="podcast-detail__favorite">
        <EpisodeFavoriteButton
          :episodeId="episode?.id"
          showLabel
        />
      </div>

      <div class="podcast-detail__request">
        <div class="podcast-request-box">
          <div class="podcast-request-box__title">
            Případ na přání
          </div>
          <p class="podcast-request-box__content">
            Máte případ, který Vám nedává spát a přejete si o něm slyšet od nás?
          </p>
          <router-link
            class="btn"
            :to="{name: 'request'}"
          >
            Navrhout případ
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-if="isLoading || (episodeDetail.previousEpisode || episodeDetail.nextEpisode)"
      class="podcast-detail__other-episodes"
    >
      <div class="container">
        <div class="other-episodes">
          <div v-if="isLoading || episodeDetail.previousEpisode">
            <div class="other-episodes__title">
              <i class="fas fa-long-arrow-alt-left" />
              Předchozí epizoda
            </div>
            <EpisodeBox :episode="episodeDetail.previousEpisode" />
          </div>
          <div v-if="isLoading || episodeDetail.nextEpisode">
            <div class="other-episodes__title">
              Následující epizoda
              <i class="fas fa-long-arrow-alt-right" />
            </div>
            <EpisodeBox :episode="episodeDetail.nextEpisode" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import PageTitle from "@/components/PageTitle.vue";
import { useRouter } from "vue-router";
import usePodcast from "@/composables/podcast";
import { useFilters } from "@/composables/filters";
import EpisodeBox from "@/components/EpisodeBox.vue";
import { useHeadResolver } from "@/composables/head";
import EpisodeFavoriteButton from "@/components/EpisodeFavoriteButton.vue";

export default defineComponent({
  name: 'EpisodeDetailPage',
  components: { EpisodeFavoriteButton, EpisodeBox, PageTitle },
  setup() {
    const router = useRouter()
    const { updateHead } = useHeadResolver()

    const episodeId = computed(() => +router.currentRoute.value.params.episodeId)
    const { fetchEpisode, isLoading, episodeDetail } = usePodcast()
    const { dateFormat } = useFilters()
    const episode = computed(() => episodeDetail.value.episode)

    watch(
      () => episodeId.value,
      async (episodeId) => {
        if (episodeId) {
          await fetchEpisode(episodeId)
          updateHead({
            titlePart: `${episode.value.serialNumber ? `${episode.value.serialNumber} - ` : ''}${episode.value.title}`,
            meta: {
              description: episode.value.description
            },
          })
        }
      },
      {
        immediate: true
      }
    )

    return {
      episode,
      episodeDetail,
      isLoading,
      dateFormat
    }
  }
});
</script>
