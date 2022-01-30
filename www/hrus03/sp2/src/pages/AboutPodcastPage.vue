<template>
  <div class="container">
    <div class="page-title">
      <h1 class="page-title__text">
        O podcastu
      </h1>
    </div>
  </div>
  <div class="page-content text-page">
    <div class="container-prose">
      <div class="paragraphs">
        <p>
          Algor Mortis je český true-crime podcast, jehož první epizoda spatřila světlo světa na konci roku 2019. Jméno
          Algor Mortis bylo zvoleno podle latinského názvu posmrtné změny teploty, původně šlo spíše o pracovní název,
          ale nakonec nám přirostl k srdci a už nebyl změněn.
        </p>
        <p>
          V podcastu se zabýváme vyřešenými i nevyřešenými případy z celého světa, snažíme se sdílet s posluchači co
          nejpřesnější a nejpravdivější informace a seznámit je s případy ze všech úhlů pohledu. Zabýváme se jak velkými
          a známými případy, které ve své době uchvátily celý svět, tak případy, o kterých téměř nikdo neslyšel.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHeadResolver } from "@/composables/head";

export default defineComponent({
  name: 'AboutPodcast',
  setup() {
    const { updateHead } = useHeadResolver()

    updateHead({
      titlePart: 'O podcastu',
      meta: { description: 'Přečtěte si něco o podcastu.' }
    })
  }
});
</script>
