import axios from "axios";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const api = process.env.NODE_ENV === "production"
    ? window.location.href.replace(window.location.hash, "").replace(/\/$/, "")
    : "http://localhost:8080";

const client = axios.create({
    baseURL: api,
    headers: {
        "Content-Type": "application/json"
    }
});

const stomp = Stomp.over(() => new SockJS(`${api}/websocket`));

const authentication = token => ({
    headers: {
        "Authorization": `Bearer ${token}`
    }
});

const whenConnected = callback => {
    if (!stomp.connected) {
        stomp.connect({}, callback);
        return;
    }

    callback();
}

const send = (topic, token, message) => whenConnected(() => stomp.send(topic, authentication(token).headers, JSON.stringify(message)));
const subscribe = (topic, callback) => whenConnected(() => stomp.subscribe(topic, callback));
const unsubscribe = (topic) => whenConnected(() => stomp.unsubscribe(topic));

export default {
    createAccount: async username => client.post("/api/authentication/create-account", {username})
        .then(response => response.data)
        .catch(() => null),

    validateToken: async token => client.post("/api/authentication/check", {}, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    loadLobbies: async token => client.get("/api/lobbies", authentication(token))
        .then(response => response.data)
        .catch(() => []),

    createLobby: async (token, mode) => client.post("/api/lobbies/create", {mode}, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    loadLobby: async (token, id) => client.get("/api/lobbies/" + id, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    joinLobby: async (token, id) => client.post(`/api/lobbies/${id}/join`, {}, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    leaveLobby: async (token, id) => client.post(`/api/lobbies/${id}/leave`, {}, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    startGame: async (token, id) => client.post(`/api/lobbies/${id}/start`, {}, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    loadGame: async (token, id) => client.get(`/api/games/${id}`, authentication(token))
        .then(response => response.data)
        .catch(() => null),

    ws: {
        lobbies: (callback) => subscribe("/lobbies", frame => callback(frame)),
        lobby: (id, callback) => subscribe(`/lobby/${id}`, frame => callback(frame)),
        game: (id) => ({
            send: (token, message) => send(`/app/game/${id}`, token, message),
            subscribe: (callback) => subscribe(`/game/${id}`, frame => callback(frame)),
            unsubscribe: () => unsubscribe(`/game/${id}`)
        })
    }
};