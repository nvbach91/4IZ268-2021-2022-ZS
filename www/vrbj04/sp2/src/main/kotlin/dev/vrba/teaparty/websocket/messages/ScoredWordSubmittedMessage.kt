package dev.vrba.teaparty.websocket.messages

import dev.vrba.teaparty.domain.game.ScoredWord

data class ScoredWordSubmittedMessage(val word: ScoredWord) : TypedMessage(MessageType.scoredWordSubmitted)