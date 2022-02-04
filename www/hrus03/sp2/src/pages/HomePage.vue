<template>
  <div class="container">
    <div class="hero">
      <div>
        <h1 class="hero__title">
          Algor Mortis
        </h1>
        <div>český true-crime podcast</div>
        <div class="hero__distanced">
          hostují: Anet a Natálie
        </div>
      </div>
    </div>
  </div>
  <div class="section-introduction">
    <div class="container-prose">
      <p>
        True crime podcast, který hostují Anet a Natálie, vypráví o případech a sdílí své teorie mezi sebou (teď už i se
        zbytkem internetu).
        <br>Pojďte se přidat k našemu vyprávění.
      </p>
    </div>
  </div>
  <section class="section-stats">
    <div class="section-stats__bg">
      <div class="container">
        <h2 class="title">
          Nový díl každý čtvrtek
        </h2>
        <nav class="stats">
          <router-link
            :to="{
              name: 'episodes',
              params: {type: PodcastEpisodeTypeEnum.EPISODE_TYPE_SOLVED}
            }"
            class="stats-item"
          >
            <div class="stats-item__number">
              {{ stats.solvedCasesCount || '-' }}
            </div>
            <div class="stats-item__label">
              vyřešených případů
            </div>
          </router-link>
          <router-link
            :to="{
              name: 'episodes',
              params: {type: PodcastEpisodeTypeEnum.EPISODE_TYPE_UNSOLVED}
            }"
            class="stats-item"
          >
            <div class="stats-item__number">
              {{ stats.unsolvedCasesCount || '-' }}
            </div>
            <div class="stats-item__label">
              nevyřešených případů
            </div>
          </router-link>
          <router-link
            :to="{
              name: 'episodes',
              params: {type: PodcastEpisodeTypeEnum.EPISODE_TYPE_BONUS}
            }"
            class="stats-item"
          >
            <div class="stats-item__number">
              {{ stats.bonusCasesCount || '-' }}
            </div>
            <div class="stats-item__label">
              bonusových epizod
            </div>
          </router-link>
        </nav>
      </div>
    </div>
  </section>
  <section class="section-latest-episode">
    <div class="container-lg">
      <div class="latest-episode">
        <h2>Nejnovější díl</h2>
        <EpisodeBox :episode="stats.latestEpisode" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EpisodeBox from "@/components/EpisodeBox.vue";
import usePodcast from "@/composables/podcast";
import { PodcastEpisodeTypeEnum } from "@/types/PodcastEpisodeTypeEnum";
import { useHeadResolver } from "@/composables/head";

export default defineComponent({
  name: 'HomePage',
  components: { EpisodeBox },
  setup() {
    const { updateHead } = useHeadResolver()
    const { stats } = usePodcast()

    updateHead({
      title: 'Algor Mortis - True crime podcast',
      meta: { description: 'True crime podcast hostován Anet a Natálií.' }
    })

    return {
      stats,
      PodcastEpisodeTypeEnum
    }
  }
});
</script>
