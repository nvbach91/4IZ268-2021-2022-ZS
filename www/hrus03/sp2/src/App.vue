<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import usePodcast from "@/composables/podcast";

export default defineComponent({
  name: 'App',
  components: { AppFooter, AppHeader },
  setup() {
    const { fetchLatestEpisode } = usePodcast()

    onMounted(async () => {
      await fetchLatestEpisode()
    })
  }
});
</script>
