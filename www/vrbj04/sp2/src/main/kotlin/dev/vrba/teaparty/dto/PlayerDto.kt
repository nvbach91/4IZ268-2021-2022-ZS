package dev.vrba.teaparty.dto

import dev.vrba.teaparty.domain.Player
import java.util.*


fun Player.dto(): PlayerDto = PlayerDto(id, username)

data class PlayerDto(val id: UUID, val username: String)