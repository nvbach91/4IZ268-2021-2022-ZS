<template>
  <div class="container">
    <div class="page-title">
      <h1 class="page-title__text">
        Doporučujeme
      </h1>
      <div class="buttons-group">
        <router-link
          v-for="item in tabs"
          :key="`Tab-${item}`"
          class="btn"
          :class="{active: item === tab}"
          :to="{params: {type: item}}"
        >
          {{ $t(`recommended.tabs.${item}.label`) }}
        </router-link>
      </div>
    </div>
  </div>
  <div class="section-recommended">
    <div class="container-md">
      <div class="recommended-sections">
        <section
          v-for="(section, sectionKey) in recommendedItems"
          :key="`Section-${sectionKey}`"
          class="recommended"
        >
          <h2 class="recommended__title">
            {{ $t(`recommended.sections.${sectionKey}`) }}
          </h2>
          <div class="recommended-items">
            <div
              v-for="(item, itemKey) in section"
              :key="`RecommendedItem-${itemKey}`"
              class="recommended-item"
            >
              <div class="recommended-item__image">
                <img
                  :src="`/images/${item.image}`"
                  alt=""
                >
              </div>
              <div class="recommended-item__content">
                <h3 class="recommended-item__title">
                  {{ item.title }}
                </h3>
                <p v-if="item.description">
                  {{ item.description }}
                </p>
                <a
                  v-if="item.link"
                  class="recommended-item__link"
                  :href="item.link"
                  target="_blank"
                >
                  <span>Přejít na stránku</span>
                  <i class="fas fa-external-link-alt" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useRoute } from "vue-router";
import { useHeadResolver } from "@/composables/head";
import { useI18n } from "vue-i18n";

enum TabsRecommended {
  books = 'books',
  podcasts = 'podcasts',
  movies = 'movies'
}

type RecommendedItem = {
  title: string
  description?: string
  link: string
  image: string
}

type Recommended = {
  [key in TabsRecommended]: {
    [key: string]: RecommendedItem[]
  }
};

export default defineComponent({
  name: 'RecommendedPage',
  setup() {
    const route = useRoute()
    const { t } = useI18n()

    const { updateHead } = useHeadResolver()

    const tab = computed(() => route.params.type?.toString() || TabsRecommended.podcasts)

    const tabs = [
      TabsRecommended.podcasts,
      TabsRecommended.books,
      TabsRecommended.movies,
    ]
    const recommendedItems = computed(() => recommended[tab.value])

    const recommended: Recommended = {
      books: {
        cs: [
          {
            title: 'Vše, co jsme si nikdy neřekli',
            description: 'Propracovaný, hluboký příběh.',
            link: 'https://www.databazeknih.cz/knihy/vse-co-jsme-si-nikdy-nerekli-275809',
            image: 'vse-co-jsme-si-nerekli.jpg',
          },
          {
            title: 'Napsáno krví',
            description: 'Můj zatím nejlepší Carter. Trochu méně brutální, více psychologických úvah, motiv sebevraždy prolíná celým dějem.',
            link: 'https://www.databazeknih.cz/knihy/robert-hunter-napsano-krvi-454437',
            image: 'napsano-krvi.jpg',
          },
        ],
        en: [
          {
            title: 'I\'ll Be Gone in the Dark: One Woman\'s Obsessive Search for the Golden State Killer',
            description: 'Zajimavý kriminální příběh.',
            link: 'https://www.goodreads.com/book/show/35068432-i-ll-be-gone-in-the-dark',
            image: 'gone-in-the-dark.jpg',
          },
        ]
      },
      movies: {
        en: [
          {
            title: 'Na nože',
            link: 'https://www.csfd.cz/film/651342-na-noze',
            image: 'knives-out.jpg',
          },
          {
            title: 'Černé zrcadlo',
            link: 'https://www.csfd.cz/film/214772-cerne-zrcadlo',
            image: 'black-mirror.jpg',
          },
        ]
      },
      podcasts: {
        cs: [
          {
            title: 'Opravdové zločiny',
            link: 'https://www.opravdovezlociny.cz',
            image: 'opravdove-zlociny.jpg',
          },
          {
            title: 'Matematika zločinu',
            link: 'https://matematikazlocinu.cz/',
            image: 'matematika-zlocinu.jpg',
          },
        ],
      },
    }

    watch(() => tab.value, (tab) => {
      updateHead({
        titlePart: t(`recommended.tabs.${tab}.title`),
        meta: { description: t(`recommended.tabs.${tab}.description`) }
      })
    }, { immediate: true })

    return {
      tab,
      tabs,
      recommendedItems,
      TabsRecommended
    }
  }
});
</script>
