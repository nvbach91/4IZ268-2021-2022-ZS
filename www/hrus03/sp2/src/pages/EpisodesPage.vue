<template>
  <PageTitle>
    {{ pageTitle }}
  </PageTitle>
  <div class="section-podcasts">
    <div class="container">
      <div
        ref="elPodcasts"
        class="podcasts"
      >
        <div class="podcasts__header">
          <div>
            <div class="podcasts__filters">
              <div>
                <label>Druh epizody</label>
                <select
                  v-model="episodeTypeFilterModel"
                >
                  <option :value="null">
                    {{ $t(`episodes.all.label`) }}
                  </option>
                  <option
                    v-for="option in episodeTypeOptions"
                    :key="`episodeTypeFilter-${option}`"
                    :value="option"
                  >
                    {{ $t(`episodes.${option}.label`) }}
                  </option>
                </select>
              </div>
              <div>
                <label>Vyhledávání</label>
                <input
                  v-model="search"
                  class="input"
                  type="text"
                >
              </div>
            </div>
          </div>
          <Paginator :paginator="paginator" />
        </div>
        <div class="podcasts__grid">
          <EpisodeBox
            v-for="episode in episodes"
            :key="episode.id"
            :episode="episode"
          />
          <template v-if="podcast.isLoading.value">
            <EpisodeBox
              v-for="i in paginator.pageSize.value"
              :key="`EpisodeSkeleton-${i}`"
            />
          </template>
        </div>
        <div
          v-if="!podcast.isLoading.value && !episodes.length"
          class="podcasts__no-results"
        >
          <div>Žádné výsledky</div>
        </div>
        <div class="podcasts__footer">
          <div class="podcast-request-box podcast-request-box--narrow">
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
          <button
            v-if="paginator.showLoadMore.value"
            class="btn"
            @click="fetchMore"
          >
            Načíst více
          </button>
          <div>
            <Paginator :paginator="paginator" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import PageTitle from "@/components/PageTitle.vue"
import EpisodeBox from "@/components/EpisodeBox.vue"
import usePodcast from "@/composables/podcast"
import { useRouter } from "vue-router"
import usePaginator from "@/composables/paginator"
import Paginator from "@/components/Paginator.vue"
import { PodcastEpisodeTypeEnum } from "@/types/PodcastEpisodeTypeEnum"
import PodcastEpisode from "@/entitites/PodcastEpisode"
import { ApiFetchEpisodesInputType } from "@/types/api/ApiFetchEpisodesInputType"
import { debounce } from "lodash-es"
import { useHeadResolver } from "@/composables/head";
import { useI18n } from "vue-i18n";

const episodeTypeOptions = [
  PodcastEpisodeTypeEnum.EPISODE_TYPE_SOLVED,
  PodcastEpisodeTypeEnum.EPISODE_TYPE_UNSOLVED,
  PodcastEpisodeTypeEnum.EPISODE_TYPE_BONUS,
]

export default defineComponent({
  name: 'EpisodesPage',
  components: {
    Paginator,
    EpisodeBox,
    PageTitle
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const { updateHead } = useHeadResolver()
    const paginator = usePaginator()
    const podcast = usePodcast()

    const elPodcasts = ref<HTMLDivElement>()
    const episodes = ref<PodcastEpisode[]>([])
    const episodeTypeFilterModel = computed({
      get() {
        return router.currentRoute.value.params.type || null
      },
      set(value: string) {
        delete router.currentRoute.value.query.page
        router.replace({ params: { type: value }, query: router.currentRoute.value.query })
      }
    })
    const search = ref(router.currentRoute.value.query.search)
    const isFetchMore = ref(false)
    const pageTitle = computed(() => {
      const type = episodeTypeFilterModel.value || PodcastEpisodeTypeEnum.EPISODE_TYPE_ALL
      return t(`episodes.${type}.label`)
    })

    const fetchEpisodes = async () => {
      if (!isFetchMore.value) {
        episodes.value = []
      }

      const fetchParams: ApiFetchEpisodesInputType = {}
      const { params, query } = router.currentRoute.value

      if (params.type) {
        fetchParams.type = params.type as PodcastEpisodeTypeEnum
      }
      if (query.page) {
        fetchParams.page = +query.page
      }
      if (query.search) {
        fetchParams.search = query.search.toString()
      }

      const {
        episodes: fetchedEpisodes,
        total
      } = await podcast.fetchEpisodes(fetchParams)

      paginator.totalItems.value = total

      if (isFetchMore.value) {
        episodes.value = [
          ...episodes.value,
          ...fetchedEpisodes
        ]
        isFetchMore.value = false
      } else {
        episodes.value = fetchedEpisodes
        if ((elPodcasts.value?.getBoundingClientRect().top || 0) < 0) {
          elPodcasts.value?.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    const fetchMore = async () => {
      isFetchMore.value = true
      await paginator.changePage(paginator.currentPage.value + 1)
    }

    const onSearch = async () => {
      const query = { ...router.currentRoute.value.query }

      if (search.value) {
        query.search = search.value
      } else {
        delete query.search
      }

      await router.replace({
        params: router.currentRoute.value.params,
        query
      })
    }

    onMounted(async () => {
      await fetchEpisodes()
    })

    watch(
      () => search.value,
      debounce(onSearch, 500)
    )

    watch(
      () => router.currentRoute.value.params.type,
      async () => {
        await fetchEpisodes()
      }
    )

    watch(
      () => router.currentRoute.value.params.type,
      async (type) => {
        updateHead({
          titlePart: pageTitle.value,
          meta: { description: t(`episodes.${type}.description`) }
        })
      },
      {
        immediate: true
      }
    )

    watch(
      () => router.currentRoute.value.query.page,
      async () => {
        await fetchEpisodes()
      }
    )

    watch(
      () => router.currentRoute.value.query.search,
      async () => {
        await fetchEpisodes()
      }
    )

    return {
      pageTitle,
      episodes,
      podcast,
      paginator,
      fetchMore,
      episodeTypeFilterModel,
      episodeTypeOptions,
      search,
      elPodcasts,
    }
  }
})
</script>
