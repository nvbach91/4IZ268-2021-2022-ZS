<template>
  <v-row>
    <v-col class="text-center mt-16" cols="12">
      <h1>Lobbies</h1>
      <v-btn :to="{name: 'CreateLobby'}" color="black" dark x-large class="my-4">
        <v-icon class="mr-4">mdi-account-group</v-icon>
        Create a new lobby
      </v-btn>
    </v-col>
    <v-col cols="10" offset="1" md="10" offset-md="1" lg="10" offset-lg="1" xl="8" offset-xl="2">
      <v-row>
        <v-col v-for="(lobby, i) in lobbies" :key="i" cols="12" md="6" lg="4">
          <v-card hover :to="{name: 'Lobby', params: { id: lobby.id } }" outlined bo>
            <v-card-title>
              <v-icon class="mr-3" :color="color(lobby.mode)">{{ icon(lobby.mode) }}</v-icon>
              {{ lobby.owner.username }}'s lobby
            </v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle>
              <div :class="`text-overline ml-2 ${color(lobby.mode)}--text`">{{ lobby.mode.replace("T", " t") }}</div>
              <code>{{ lobby.id }}</code>
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <v-icon>mdi-account</v-icon> <strong class="ml-2 text-overline">{{ lobby.players.length }} player{{ lobby.players.length > 1 ? 's' : ''}}</strong>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import api from "@/api";

export default {
  name: "Lobbies",
  async mounted() {
    await this.$store.dispatch("loadLobbies");

    api.ws.lobbies(update => {
      const message = JSON.parse(update.body);
      this.$store.commit("setLobbies", message.lobbies);
    })
  },
  methods: {
    color(mode) {
      return {
        "GreenTea": "green",
        "YellowTea": "orange",
        "RedTea": "red"
      }[mode];
    },
    icon(mode) {
      return {
        "GreenTea": "mdi-timer-outline",
        "YellowTea": "mdi-abacus",
        "RedTea": "mdi-ruler"
      }[mode];
    }
  },
  computed: {
    lobbies: function () {
      return this.$store.state.lobbies;
    }
  }
}
</script>