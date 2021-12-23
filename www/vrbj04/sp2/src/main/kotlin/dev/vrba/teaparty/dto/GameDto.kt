package dev.vrba.teaparty.dto

import dev.vrba.teaparty.domain.Game
import dev.vrba.teaparty.domain.game.GameMode
import dev.vrba.teaparty.domain.game.GameRound
import java.util.*

fun Game.dto(): GameDto = GameDto(
    id,
    mode,
    players.map { it.dto() },
    scores.toList()
        .map { (player, score) -> Score(player, score) }
        .sortedByDescending { it.score },
    round,
    finished
)

data class Score(val player: UUID, val score: Int)

data class GameDto(
    val id: UUID,
    val mode: GameMode,
    val players: List<PlayerDto>,
    val scores: List<Score>,
    val round: GameRound?,
    val finished: Boolean
)