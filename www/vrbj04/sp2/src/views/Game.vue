<template>
  <div>
    <v-fade-transition>
      <v-overlay class="text-center" opacity="0.9" v-if="this.connection === null">
        <v-icon size="128">mdi-connection</v-icon>
        <h1 class="mt-8">Connecting to the game server...</h1>
      </v-overlay>
    </v-fade-transition>
    <v-container v-if="this.connection !== null">
      <v-row v-if="game.finished">
        <v-col cols="12">
          <div class="text-center mt-16">
            <h1 class="display-2 text-center mt-8">The game is over!</h1>
          </div>
          <v-row class="my-8 mx-16">
            <v-col v-if="game.scores.length > 1" class="text-center d-flex flex-column">
              <v-icon size="96" color="grey">mdi-medal</v-icon>
              <h1 class="grey--text">{{ game.scores[1].score }}</h1>
              <div class="display-1">{{ player(game.scores[1].player).username }}</div>
            </v-col>
            <v-col class="text-center d-flex flex-column">
              <v-icon size="96" color="orange">mdi-trophy-variant</v-icon>
              <h1 class="orange--text">{{ game.scores[0].score }}</h1>
              <div class="display-1">{{ player(game.scores[0].player).username }}</div>
            </v-col>
            <v-col v-if="game.scores.length > 2" class="text-center">
              <v-icon size="96" color="brown">mdi-medal</v-icon>
              <h1 class="brown--text">{{ game.scores[2].score }}</h1>
              <div class="display-1">{{ player(game.scores[2].player).username }}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-center" cols="12">
          <v-btn :to="{name: 'Lobbies'}" dark color="black">Return to lobbies</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="8">
          <v-card class="d-flex flex-column" style="min-height: 90vh">
            <v-card-title>Game</v-card-title>
            <v-card-subtitle class="text-overline">
              Playing <span class="black--text">{{ game.mode.replace("T", " t") }}</span>
            </v-card-subtitle>
            <v-divider v-if="game.round !== null"/>
            <v-card-text v-if="game.round !== null">
              <div class="text-overline">
                <h2 class="grey--text">Type in a word containing <strong class="primary--text">{{
                    game.round.syllable
                  }}</strong></h2>
              </div>
              <v-progress-linear :value="time" max="100"></v-progress-linear>
            </v-card-text>
            <v-divider/>
            <v-card-text style="height: 60vh; overflow: scroll">
              <v-fade-transition>
                <v-alert v-if="game.round === null" class="text-center">
                  <v-icon class="mdi-spin mb-4" size="96">mdi-yin-yang</v-icon>
                  <h1>Waiting for a new round to start...</h1>
                </v-alert>
              </v-fade-transition>
              <v-row>
                <v-col v-for="(word, i) in words" :key="i" cols="12">
                  <v-chip :disabled="word.score < 0" :color="rank(word.score, words) === 0 ? 'orange' : 'black'" large
                          text-color="white" class="px-8">
                    <div class="text-overline mr-3">{{ player(word.player).username }}:</div>
                    <div class="h2">{{ word.value }}</div>
                    <v-icon v-if="rank(word.score, words) === 0" class="ml-4">mdi-trophy-variant</v-icon>
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider/>
            <v-card-text class="d-flex flex-row align-stretch">
              <v-text-field outlined class="flex-grow-1" hint="Tip: You can use enter to submit the word" v-model="word"
                            :persistent-hint="true" autofocus @keydown.enter="submitWord()"></v-text-field>
              <v-btn color="primary" class="ml-2" icon x-large @click="submitWord()">
                <v-icon>mdi-chevron-double-right</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Score</v-card-title>
            <v-card-subtitle class="text-overline">Once one of the players hits <strong>50</strong> points, the game
              ends
            </v-card-subtitle>
            <v-divider/>
            <v-card-text>
              <v-row>
                <v-col v-for="(entry, i) in scores" cols="12" :key="i">
                  <v-card outlined>
                    <v-card-text class="d-flex flex-row align-center">
                      <strong class="text-h5 primary--text">{{ entry.score }}</strong>
                      <v-divider vertical class="mx-4"/>
                      <span class="text-overline">{{ player(entry.player).username }}</span>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Game",
  data: () => ({
    connection: null,
    hook: null,
    time: 0,
    word: "",
    words: []
  }),
  async mounted() {
    await this.$store.dispatch("loadGame", this.$route.params.id);

    if (this.$store.state.game === null) {
      await this.$router.replace({name: "Lobbies"});
      return;
    }

    this.connection = api.ws.game(this.$route.params.id);
    this.connection.subscribe(async frame => {
      const message = JSON.parse(frame.body);
      const type = message.type;

      switch (type) {
        case "game-updated":
          await this.$store.commit("setGame", message.game);
          this.words = [];
          this.word = "";
          break;
        case "scored-word-submitted":
          this.words.push(message.word);
          break;
        default:
          console.error(`Unknown message type: ${type}`)
      }
    });

    this.hook = window.setInterval(this.updateTime, 500);
  },
  beforeDestroy() {
    if (this.connection !== null) {
      this.connection.unsubscribe()
    }

    window.clearInterval(this.hook);
  },
  methods: {
    updateTime() {
      if (this.game.round === null) {
        this.time = 0;
        return;
      }

      const now = new Date();
      const diff = new Date(this.game.round.end) - now;
      const total = new Date(this.game.round.end) - new Date(this.game.round.start);

      this.time = Math.max((diff / total) * 100, 0);
    },
    submitWord() {
      if (this.word.trim() !== "") {
        this.connection.send(this.$store.state.token, {word: this.word.toLowerCase()})
        this.word = "";
      }
    },
    player(id) {
      return this.game.players.find(player => player.id === id);
    },
    rank(score, words) {
      return [...words]
          .map(word => word.score)
          .filter(score => score !== -1)
          .sort()
          .reverse()
          .indexOf(score)
    }
  },
  computed: {
    scores: function () {
      return [...this.game.scores].sort((a, b) => a.score - b.score);
    },
    game: function () {
      return this.$store.state.game;
    }
  }
}
</script>