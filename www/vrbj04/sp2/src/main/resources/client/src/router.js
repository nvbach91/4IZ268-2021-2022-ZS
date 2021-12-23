import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "./store";

import Login from "@/views/Login";
import Lobbies from "@/views/Lobbies";
import CreateLobby from "@/views/CreateLobby";
import Lobby from "@/views/Lobby";
import Game from "@/views/Game";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: "Homepage",
        redirect: "/lobbies",
    },
    {
        name: "Login",
        path: "/login",
        component: Login
    },
    {
        name: "Lobbies",
        path: "/lobbies",
        component: Lobbies
    },
    {
        name: "CreateLobby",
        path: "/lobbies/create",
        component: CreateLobby
    },
    {
        name: "Lobby",
        path: "/lobby/:id",
        component: Lobby
    },
    {
        name: "Game",
        path: "/game/:id",
        component: Game
    }
]

const router = new VueRouter({
    routes,
})

router.beforeEach(async (to, from, next) => {
    // TODO: Add token validation cache later on
    await store.dispatch("validateToken");

    if (to.name !== "Login" && (store.state.token === null || store.state.token === "null")) {
        next({name: "Login"});
    }
    else {
        next();
    }
})

export default router
