package dev.vrba.teaparty.websocket.messages

import dev.vrba.teaparty.dto.LobbyDto

class LobbiesUpdatedMessage(val lobbies: List<LobbyDto>) : TypedMessage(MessageType.lobbiesUpdated)