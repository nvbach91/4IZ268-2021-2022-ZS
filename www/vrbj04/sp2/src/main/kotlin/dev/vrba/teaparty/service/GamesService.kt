package dev.vrba.teaparty.service

import dev.vrba.teaparty.domain.Game
import dev.vrba.teaparty.domain.Lobby
import dev.vrba.teaparty.domain.Player
import dev.vrba.teaparty.domain.game.GameRound
import dev.vrba.teaparty.domain.game.ScoredWord
import dev.vrba.teaparty.domain.game.SubmittedWord
import dev.vrba.teaparty.dto.dto
import dev.vrba.teaparty.exceptions.GameNotFoundException
import dev.vrba.teaparty.exceptions.NotJoinedInGameException
import dev.vrba.teaparty.repository.GamesRepository
import dev.vrba.teaparty.websocket.messages.GameUpdatedMessage
import dev.vrba.teaparty.websocket.messages.ScoredWordSubmittedMessage
import org.springframework.data.repository.findByIdOrNull
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.TaskScheduler
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.Instant
import java.util.*

@Service
class GamesService(
    private val scoringService: WordScoringService,
    private val repository: GamesRepository,
    private val template: SimpMessagingTemplate,
    private val scheduler: TaskScheduler
) {

    fun deleteAllGames() = repository.deleteAll()

    fun findGame(id: UUID, player: Player): Game {
        // I can imagine this being handled with monads, maybe one day...
        val game = repository.findByIdOrNull(id) ?: throw GameNotFoundException

        if (!game.players.contains(player)) {
            throw NotJoinedInGameException
        }

        return game
    }

    fun createGame(lobby: Lobby): Game {
        val scores = lobby.players.associate { it.id to 0 }
        val game =  Game(mode = lobby.mode, players = lobby.players, scores = scores).let {
            scheduleNextRound(it)
            repository.save(it)
        }

        return game
    }

    fun submitWord(id: UUID, player: Player, word: String) {
        val game = repository.findByIdOrNull(id) ?: return
        val round = game.round ?: return

        val submitted = SubmittedWord(word, player.id, Instant.now())
        val scored = scoringService.score(round.mode, submitted, round.syllable, round.words)

        game.copy(round = round.copy(words = round.words + scored)).let { repository.save(it) }
        broadcastScoredWord(game, scored)
    }

    private fun scheduleNextRound(game: Game) {
        val runnable = {
            game.copy(round = createNewRound(game)).let {
                // TODO: check win conditions here
                scheduler.schedule({ scheduleNextRound(it) }, game.round?.end ?: Instant.now())

                repository.save(it)
                broadcastGameUpdate(it)
            }
        }

        // 10 seconds should be enough for all players to be connected to the websocket endpoint
        scheduler.schedule(runnable, Instant.now() + Duration.ofSeconds(10))
    }

    private fun createNewRound(game: Game): GameRound {
        // TODO: Add proper list of syllables / procedural generator
        val syllable = listOf("syl", "sys", "cot").random()

        // TODO: Add game configuration later
        val start = Instant.now()
        val end = start + Duration.ofSeconds(15)

        return GameRound(start = start, end = end, mode = game.mode, syllable = syllable, listOf())
    }

    private fun broadcastScoredWord(game: Game, word: ScoredWord) {
        val topic = "/game/${game.id}"
        val message = ScoredWordSubmittedMessage(word)

        template.convertAndSend(topic, message)
    }

    private fun broadcastGameUpdate(game: Game) {
        val topic = "/game/${game.id}"
        val message = GameUpdatedMessage(game.dto())

        template.convertAndSend(topic, message)
    }
}