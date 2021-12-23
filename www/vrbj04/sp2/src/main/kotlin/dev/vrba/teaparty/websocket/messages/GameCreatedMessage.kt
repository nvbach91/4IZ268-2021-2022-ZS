package dev.vrba.teaparty.websocket.messages

import dev.vrba.teaparty.dto.GameDto

data class GameCreatedMessage(val game: GameDto) : TypedMessage(MessageType.gameCreated)