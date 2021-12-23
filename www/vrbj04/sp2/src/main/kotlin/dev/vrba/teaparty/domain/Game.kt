package dev.vrba.teaparty.domain

import dev.vrba.teaparty.domain.game.GameMode
import dev.vrba.teaparty.domain.game.GameRound
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document("games")
data class Game(
    @Id
    val id: UUID = UUID.randomUUID(),

    val mode: GameMode,

    @DBRef
    val players: List<Player>,

    val scores: Map<UUID, Int>,

    val round: GameRound? = null,

    val finished: Boolean = false
)