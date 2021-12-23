package dev.vrba.teaparty.service

import dev.vrba.teaparty.domain.Game
import dev.vrba.teaparty.domain.Lobby
import dev.vrba.teaparty.domain.Player
import dev.vrba.teaparty.domain.game.GameRound
import dev.vrba.teaparty.domain.game.ScoredWord
import dev.vrba.teaparty.domain.game.ScoringType
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
        val game = Game(mode = lobby.mode, players = lobby.players, scores = scores)

        repository.save(game)
        scheduleNextRound(game.id)

        return game
    }

    fun submitWord(id: UUID, player: Player, word: String) {
        val game = repository.findByIdOrNull(id) ?: return
        val round = game.round ?: return

        val submitted = SubmittedWord(word, player.id, Instant.now())
        val scored = scoringService.score(round.mode, submitted, round)

        game.copy(round = round.copy(words = round.words + scored)).let { repository.save(it) }
        broadcastScoredWord(game, scored)
    }

    private fun scoreRound(id: UUID) {
        val game = repository.findByIdOrNull(id) ?: return
        val round = game.round ?: throw IllegalStateException("Scoring a game where round == null")

        // Pick best word for each player
        val best = round.words.groupBy { it.player }
            .map { (player, words) -> player to words.maxOf { it.score } }
            .sortedByDescending { (_, score) -> score }

        val change = when (round.mode.scoring) {
            ScoringType.Single -> best.firstOrNull()?.let { mapOf(it.first to 5) } ?: mapOf()
            ScoringType.TopThree -> best.take(3).mapIndexed { index, word ->
                // First player receives 5 points, second receives 3 points and third player receives 1 point
                word.first to (5 - 2 * index).coerceAtLeast(0)
            }.toMap()
        }

        val scores = game.scores.map { (player, score) -> player to score + (change[player] ?: 0) }.toMap()
        val finished = scores.any { (_, score) -> score >= 10 }

        game.copy(round = null, scores = scores, finished = finished).let {
            if (!it.finished) {
                scheduler.schedule({ scheduleNextRound(id) }, Instant.now() + Duration.ofSeconds(5))
            }

            broadcastGameUpdate(it)
            repository.save(it)
        }
    }

    private fun scheduleNextRound(id: UUID) {
        val game = repository.findByIdOrNull(id) ?: return
        val runnable = {
            game.copy(round = createNewRound(game)).let {
                scheduler.schedule({ scoreRound(id) }, it.round!!.end)
                repository.save(it)
                broadcastGameUpdate(it)
            }
        }

        // 5 seconds should be enough for all players to be connected to the websocket endpoint
        scheduler.schedule(runnable, Instant.now() + Duration.ofSeconds(5))
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