package dev.vrba.teaparty.controller

import dev.vrba.teaparty.domain.Player
import dev.vrba.teaparty.dto.GameDto
import dev.vrba.teaparty.dto.dto
import dev.vrba.teaparty.service.GamesService
import dev.vrba.teaparty.service.PlayersService
import org.springframework.http.ResponseEntity
import org.springframework.messaging.Message
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api/games")
class GamesController(private val playersService: PlayersService, private val gamesService: GamesService) {

    @GetMapping("/{id}")
    fun game(@PathVariable("id") id: UUID, @AuthenticationPrincipal player: Player): ResponseEntity<GameDto> {
        val game = gamesService.findGame(id, player)
        val dto = game.dto()

        return ResponseEntity.ok(dto)
    }

    data class WordSubmission(val word: String)

    @MessageMapping("/game/{id}")
    fun submitWord(@DestinationVariable("id") id: UUID, message: Message<*>, submission: WordSubmission) {
        // TODO: Fix this ugly typecasting shit
        val headers = message.headers["nativeHeaders"] as? Map<*, *> ?: return
        val player = headers["Authorization"]?.let {
            val value = (it as List<*>)[0]
            val token = (value as String).removePrefix("Bearer ")

            playersService.findPlayer(token)
        } ?: return

        gamesService.submitWord(id, player, submission.word)
    }
}