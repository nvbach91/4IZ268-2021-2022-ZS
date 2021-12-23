package dev.vrba.teaparty.service

import dev.vrba.teaparty.domain.Player
import dev.vrba.teaparty.repository.PlayersRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class PlayersService(private val repository: PlayersRepository) {

    fun createPlayerAccount(username: String): Player {
        return Player(username).let {
            repository.save(it)
        }
    }

    fun findPlayer(token: String): Player? {
        return repository.findByToken(token)
    }

    fun deleteAllPlayerAccounts() {
        repository.deleteAll()
    }

}