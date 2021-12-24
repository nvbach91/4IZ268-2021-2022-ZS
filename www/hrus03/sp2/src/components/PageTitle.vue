<template>
  <div class="container">
    <div
      class="page-title"
      :class="{
        'page-title--back': backButton,
        'page-title--sm': sm,
      }"
    >
      <a
        v-if="backButton"
        href="#"
        class="page-title__back"
        title="Zpět"
      >
        <i class="fas fa-arrow-left" />
      </a>
      <h1 class="page-title__text">
        <slot />
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PageTitle',
  props: {
    backButton: Boolean,
    sm: Boolean,
  }
});
</script>


