<template>
  <div class="container">
    <div
      class="page-title"
      :class="{
        'page-title--back': back,
        'page-title--sm': sm,
      }"
    >
      <router-link
        v-if="back"
        :to="back"
        class="page-title__back"
        title="Zpět"
      >
        <i class="fas fa-arrow-left" />
      </router-link>
      <h1 class="page-title__text">
        <slot />
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageTitle',
  props: {
    back: Object,
    sm: Boolean,
  }
});
</script>


