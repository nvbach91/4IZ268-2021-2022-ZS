package dev.vrba.teaparty.repository

import dev.vrba.teaparty.domain.Game
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface GamesRepository : MongoRepository<Game, UUID>