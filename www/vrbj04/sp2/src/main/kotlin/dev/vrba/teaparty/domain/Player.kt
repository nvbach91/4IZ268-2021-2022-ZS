package dev.vrba.teaparty.domain

import dev.vrba.teaparty.security.SecurityUtils.generateRandomToken
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document("players")
data class Player(
    @Id
    val id: UUID,
    val username: String,
    val token: String,
) {
    constructor(username: String) : this(UUID.randomUUID(), username, generateRandomToken())
}
