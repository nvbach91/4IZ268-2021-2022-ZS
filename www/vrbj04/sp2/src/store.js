import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api";

Vue.use(Vuex)

const whileLoading = async (store, callback) => {
  await store.commit("setLoading", true);
  const result = await callback();
  await store.commit("setLoading", false);

  return result;
}

export default new Vuex.Store({
  state: {
    loading: false,
    player: null,
    token: window.localStorage.getItem("token"),
    lobbies: [],
    lobby: null,
    game: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      window.localStorage.setItem("token", token);
    },
    setPlayer(state, player) {
      state.player = player;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setLobbies(state, lobbies) {
      state.lobbies = lobbies;
    },
    setLobby(state, lobby) {
      state.lobby = lobby;
    },
    setGame(state, game) {
      state.game = game;
    }
  },
  actions: {
    validateToken: async (store) => {
      await whileLoading(store, async () => {
        const validation = await api.validateToken(store.state.token);

        if (validation !== null) {
          await store.commit("setPlayer", validation.id);
          return;
        }

        await store.commit("setToken", null);
        await store.commit("setPlayer", null);
      })
    },
    createAccount: async (store, username) => {
      await whileLoading(store, async () => {
        const user = await api.createAccount(username);
        await store.commit("setToken", user.token);
      });
    },
    loadLobbies: async (store) => {
      await whileLoading(store, async () => {
        const lobbies = await api.loadLobbies(store.state.token);
        await store.commit("setLobbies", lobbies)
      });
    },
    createLobby: async (store, mode) => {
      return await whileLoading(store, async () =>  await api.createLobby(store.state.token, mode));
    },
    loadLobby: async (store, id) => {
      await whileLoading(store, async () => {
        const lobby = await api.loadLobby(store.state.token, id);
        await store.commit("setLobby", lobby);
      });
    },
    joinLobby: async (store, id) => {
      await whileLoading(store, async () => {
        await api.joinLobby(store.state.token, id);
      });
    },
    leaveLobby: async (store, id) => {
      await whileLoading(store, async () => {
        await api.leaveLobby(store.state.token, id);
      });
    },
    startGame: async (store, id) => {
      await whileLoading(store, async () => {
        await api.startGame(store.state.token, id);
      });
    },
    loadGame: async (store, id) => {
      await whileLoading(store, async () => {
        const game = await api.loadGame(store.state.token, id);
        await store.commit("setGame", game);
      })
    }
  },
  modules: {
  }
})
