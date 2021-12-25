<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <v-spacer></v-spacer>
      <v-icon size="32">mdi-tea</v-icon>
      <h1 class="ml-4">Tea party</h1>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-fade-transition>
        <v-overlay opacity="0.6" color="black" v-if="this.$store.state.loading">
          <v-icon size="256" class="mdi-spin">mdi-yin-yang</v-icon>
        </v-overlay>
      </v-fade-transition>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
