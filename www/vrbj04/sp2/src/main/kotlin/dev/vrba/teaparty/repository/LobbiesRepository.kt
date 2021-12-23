package dev.vrba.teaparty.repository

import dev.vrba.teaparty.domain.Lobby
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface LobbiesRepository : MongoRepository<Lobby, UUID>