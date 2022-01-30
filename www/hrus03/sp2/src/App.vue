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
import { useHead } from "@vueuse/head";
import { useHeadResolver } from "@/composables/head";

export default defineComponent({
  name: 'App',
  components: { AppFooter, AppHeader },
  setup() {
    const { headObject } = useHeadResolver()
    const { fetchStats } = usePodcast()

    useHead(headObject)

    onMounted(async () => {
      await fetchStats()
    })
  }
});
</script>
