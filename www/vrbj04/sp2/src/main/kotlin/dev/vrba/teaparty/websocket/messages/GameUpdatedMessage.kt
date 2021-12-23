package dev.vrba.teaparty.websocket.messages

import dev.vrba.teaparty.dto.GameDto

data class GameUpdatedMessage(val game: GameDto) : TypedMessage(MessageType.gameUpdated)