package dev.vrba.teaparty.dto

import dev.vrba.teaparty.domain.Lobby
import dev.vrba.teaparty.domain.game.GameMode
import java.util.*

fun Lobby.dto(): LobbyDto = LobbyDto(
    id,
    mode,
    owner.dto(),
    players.map { it.dto() }
)

data class LobbyDto(
    val id: UUID,
    val mode: GameMode,
    val owner: PlayerDto,
    val players: List<PlayerDto>
)