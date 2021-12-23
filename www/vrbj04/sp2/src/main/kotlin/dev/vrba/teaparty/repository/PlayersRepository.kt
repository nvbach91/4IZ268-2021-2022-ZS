package dev.vrba.teaparty.repository

import dev.vrba.teaparty.domain.Player
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface PlayersRepository : MongoRepository<Player, UUID> {

    fun findByToken(token: String): Player?

}