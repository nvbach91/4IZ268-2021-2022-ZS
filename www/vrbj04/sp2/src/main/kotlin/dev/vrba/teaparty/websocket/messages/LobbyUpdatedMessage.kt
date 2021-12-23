package dev.vrba.teaparty.websocket.messages

import dev.vrba.teaparty.dto.LobbyDto

data class LobbyUpdatedMessage(val lobby: LobbyDto) : TypedMessage(MessageType.lobbyUpdated)