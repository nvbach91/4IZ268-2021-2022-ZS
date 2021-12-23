package dev.vrba.teaparty.domain.game

import java.time.Instant
import java.util.*

data class ScoredWord(
    val value: String,
    val player: UUID,
    val timestamp: Instant,
    val score: Double,
)