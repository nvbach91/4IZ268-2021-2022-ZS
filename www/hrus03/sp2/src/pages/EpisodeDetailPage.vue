<template>
  <PageTitle
    sm
    backButton
  >
    {{ episode.title }}
  </PageTitle>
  <div class="podcast-detail">
    <div class="container-prose">
      <div v-html="episode.description" />
      <iframe
        src="https://www.buzzsprout.com/686489/9707254?iframe=true"
        class="podcast-detail__embed"
        scrolling="no"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import PageTitle from "@/components/PageTitle.vue";
import { useRouter } from "vue-router";
import usePodcast from "@/composables/podcast";
import PodcastEpisode from "@/entitites/PodcastEpisode";

export default defineComponent({
  name: 'EpisodeDetailPage',
  components: { PageTitle },
  props: {
    episodeTitle: {
      type: Object as PropType<PodcastEpisode>,
      default: null
    }
  },
  setup(props) {
    const router = useRouter()
    const episodeId = computed(() => router.currentRoute.value.params.episodeId)
    const episode = ref<PodcastEpisode>();
    const { fetchEpisode } = usePodcast()

    watch(
      () => episodeId.value,
      async (episodeId) => {
        if (episodeId) {
          episode.value = await fetchEpisode(episodeId.toString())
        }
      },
      {
        immediate: true
      }
    )

    onMounted(() => {
      let podcastScript = document.createElement('script')
      podcastScript.setAttribute(
        'src',
        'https://www.buzzsprout.com/686489/9707254.js?container_id=buzzsprout-player&player=small'
      )
      document.head.appendChild(podcastScript)
    })

    return {
      episode
    }
  }
  ,
});
</script>
