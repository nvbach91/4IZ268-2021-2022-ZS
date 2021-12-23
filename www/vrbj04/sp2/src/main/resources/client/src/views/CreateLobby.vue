<template>
  <div class="text-center mt-16">
    <v-row class="mt-16">
      <v-col offset="1" offset-md="2" offset-lg="3" md="8" lg="6" cols="10">
        <v-card>
          <v-card-title>
            <router-link :to="{name: 'Lobbies'}" class="mr-4">
              <v-icon>mdi-arrow-left</v-icon>
            </router-link>
            Create a new lobby
          </v-card-title>
          <v-card-text>
            <div class="text-overline my-4">Select game mode</div>
            <v-row>
              <v-col cols="12" md="4">
                <v-card hover :color="selected === 'GreenTea' ? 'green' : 'gray'" :dark="selected === 'GreenTea'" outlined @click="selected = 'GreenTea'">
                  <v-card-text>
                    <v-icon :color="selected === 'GreenTea' ? '' : 'green'" size="32">mdi-timer-outline</v-icon>
                    <div :class="`text-center text-overline ${selected === 'GreenTea' ? '' : 'green--text'}`">Green tea</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                  <v-card hover :color="selected === 'YellowTea' ? 'orange' : 'gray'" :dark="selected === 'YellowTea'" outlined @click="selected = 'YellowTea'">
                  <v-card-text>
                    <v-icon :color="selected === 'YellowTea' ? '' : 'orange'" size="32">mdi-abacus</v-icon>
                    <div :class="`text-center text-overline ${selected === 'YellowTea' ? '' : 'orange--text'}`">Yellow tea</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                  <v-card hover :color="selected === 'RedTea' ? 'red' : 'gray'" :dark="selected === 'RedTea'" outlined @click="selected = 'RedTea'">
                  <v-card-text>
                    <v-icon :color="selected === 'RedTea' ? '' : 'red'" size="32">mdi-ruler</v-icon>
                    <div :class="`text-center text-overline ${selected === 'RedTea' ? '' : 'red--text'}`">Red tea</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-btn block :disabled="selected === null" color="black" :dark="selected !== null" x-large @click="createLobby()">
                  Create lobby
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CreateLobby",
  data: () => ({
    selected: null
  }),
  methods: {
    async createLobby() {
      const lobby = await this.$store.dispatch("createLobby", this.selected);

      if (lobby !== null) {
        await this.$router.push({ name: "Lobby", params: { id: lobby.id }});
      }
    }
  }
}
</script>