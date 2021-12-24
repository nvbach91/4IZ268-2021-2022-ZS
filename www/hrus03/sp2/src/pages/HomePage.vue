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
          <a
            class="stats-item"
            href="podcasts/solved.html"
          >
            <div class="stats-item__number">3</div>
            <div class="stats-item__label">vyřešené případy</div>
          </a>
          <a
            class="stats-item"
            href="podcasts/unsolved.html"
          >
            <div class="stats-item__number">3</div>
            <div class="stats-item__label">nevyřešené případy</div>
          </a>
          <a
            class="stats-item"
            href="podcasts/bonus-content.html"
          >
            <div class="stats-item__number">2</div>
            <div class="stats-item__label">bonusové epizody</div>
          </a>
        </nav>
      </div>
    </div>
  </section>
  <section class="section-latest-episode">
    <div class="container-lg">
      <div class="latest-episode">
        <h2>Nejnovější díl</h2>
        <EpisodeBox :episode="latestEpisode" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import EpisodeBox from "@/components/EpisodeBox.vue";
import usePodcast from "@/composables/podcast";

export default defineComponent({
  name: 'HomePage',
  components: { EpisodeBox },
  setup() {
    const { latestEpisode } = usePodcast()
    return {
      latestEpisode
    }
  }
});
</script>
