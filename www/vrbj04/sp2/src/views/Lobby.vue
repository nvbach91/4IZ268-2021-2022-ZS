<template>
  <div v-if="lobby !== null" class="text-center mt-16">
    <h1>{{ lobby.owner.username }}'s lobby</h1>
    <h2 class="mb-4 text-overline grey--text">Playing <span class="black--text">{{ lobby.mode.replace("T", " t") }}</span> mode</h2>

    <div class="my-8 text-center">
    <v-btn v-if="joined" dark :color="owner ? 'black' : 'red'" large @click="leaveLobby()"><v-icon class="mr-2">mdi-logout-variant</v-icon> Leave this lobby</v-btn>
    <v-btn v-else dark large @click="joinLobby()"><v-icon class="mr-2">mdi-login-variant</v-icon> Join this lobby</v-btn>
    </div>

    <v-btn v-if="owner" x-large color="light-green darken-1" dark @click="startGame()">
      <v-icon>mdi-tea</v-icon>
      <span class="ml-4">Start the game</span>
    </v-btn>
    <h3 v-else class="grey--text text--darken-1">
      <v-icon class="mr-4">mdi-account-clock</v-icon>
      Waiting for the lobby host to start the game...
    </h3>

    <v-container>
      <v-row class="mt-16">
        <v-col v-for="(player, i) in lobby.players" :key="i" cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card outlined flat rounded>
            <v-card-title>
              <v-icon size="24" :color="lobby.owner.id === player.id ? 'black' : 'gray'">
                {{ lobby.owner.id === player.id ? 'mdi-emoticon-cool-outline' : 'mdi-emoticon-happy-outline' }}
              </v-icon>
              <span class="ml-3">{{ player.username }}</span>
              <v-chip color="black" dark class="ml-3" v-if="lobby.owner.id === player.id">host</v-chip>
              <v-chip color="primary" dark class="ml-3" v-if="$store.state.player === player.id">it's you</v-chip>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Lobby",
  async mounted() {
    await this.$store.dispatch("loadLobby", this.$route.params.id);

    if (this.lobby === null) {
      await this.$router.replace({name: "Lobbies"});
    }

    await this.connect();
  },
  methods: {
    async connect() {
      api.ws.lobby(this.$route.params.id, async frame => {
        const message = JSON.parse(frame.body);

        if (message.type === "lobby-updated") {
          await this.$store.commit("setLobby", message.lobby);
        }
        else {
          await this.$store.commit("setLoading", true);
          await this.$router.replace({name: "Game", params: {id: message.game.id}});
        }
      });
    },
    async joinLobby() {
      await this.$store.dispatch("joinLobby", this.lobby.id);
    },
    async leaveLobby() {
      await this.$store.dispatch("leaveLobby", this.lobby.id);
      await this.$router.push({name: "Lobbies"});
    },
    async startGame() {
      await this.$store.dispatch("startGame", this.lobby.id);
    }
  },
  computed: {
    lobby: function () {
      return this.$store.state.lobby;
    },
    joined: function () {
      return this.lobby !== null && this.lobby.players.some(player => player.id === this.$store.state.player);
    },
    owner: function () {
      return this.lobby !== null && this.lobby.owner.id === this.$store.state.player;
    }
  }
}
</script>