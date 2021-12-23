package dev.vrba.teaparty.domain.game

import java.time.Instant
import java.util.*

data class SubmittedWord(
    val value: String,
    val player: UUID,
    val timestamp: Instant
) {
    fun score(score: Double): ScoredWord = ScoredWord(value, player, timestamp, score)
}