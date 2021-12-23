package dev.vrba.teaparty.domain

import dev.vrba.teaparty.domain.game.GameMode
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document
data class Lobby(
    @Id
    val id: UUID,

    val mode: GameMode,

    @DBRef
    val owner: Player,

    @DBRef
    val players: List<Player>
) {
    constructor (mode: GameMode, owner: Player) : this(UUID.randomUUID(), mode, owner, listOf(owner))
}
