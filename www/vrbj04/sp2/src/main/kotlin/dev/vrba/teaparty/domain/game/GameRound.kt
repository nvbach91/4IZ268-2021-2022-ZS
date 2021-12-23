package dev.vrba.teaparty.domain.game

import java.time.Instant

data class GameRound(
    val start: Instant,
    val end: Instant,
    val mode: GameMode,
    val syllable: String,
    val words: List<ScoredWord>,
)