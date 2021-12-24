<template>
  <nav
    v-if="paginator.totalItems.value"
    class="paginator"
  >
    <router-link
      v-for="item in paginator.nav.value"
      :key="`Paginator-${item}`"
      :class="{'active': paginator.isActive(item)}"

      :to="paginator.getPageLink(item)"
    >
      {{ item }}
    </router-link>
    <span v-if="paginator.showLastPageSeparator.value">/</span>
    <router-link
      :class="{'active': paginator.isLastPage.value}"
      :to="paginator.getPageLink(paginator.totalPages.value)"
    >
      {{ paginator.totalPages.value }}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    paginator: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
