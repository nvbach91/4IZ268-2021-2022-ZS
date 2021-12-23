package dev.vrba.teaparty.controller

import dev.vrba.teaparty.domain.Player
import dev.vrba.teaparty.domain.game.GameMode
import dev.vrba.teaparty.dto.GameDto
import dev.vrba.teaparty.dto.LobbyDto
import dev.vrba.teaparty.dto.dto
import dev.vrba.teaparty.service.LobbiesService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/lobbies")
class LobbiesController(private val service: LobbiesService) {

    @GetMapping
    fun listLobbies(): ResponseEntity<List<LobbyDto>> {
        val lobbies = service.listAll()
        val dtos = lobbies.map { it.dto() }

        return ResponseEntity.ok(dtos)
    }

    @GetMapping("/{id}")
    fun lobby(@PathVariable("id") id: UUID): ResponseEntity<LobbyDto> {
        val lobby = service.findLobby(id)
        val dto = lobby.dto()

        return ResponseEntity.ok(dto)
    }

    data class CreateLobbyRequest(val mode: GameMode)

    @PostMapping("/create")
    fun createLobby(@RequestBody request: CreateLobbyRequest, @AuthenticationPrincipal player: Player): ResponseEntity<LobbyDto> {
        val lobby = service.createLobby(request.mode, player)
        val dto = lobby.dto()

        return ResponseEntity.ok(dto)
    }

    @PostMapping("/{id}/join")
    fun joinLobby(@PathVariable("id") id: UUID, @AuthenticationPrincipal player: Player): ResponseEntity<*> {
        service.joinLobby(id, player)
        return ResponseEntity.ok(mapOf("message" to "Joined the lobby"))
    }

    @PostMapping("/{id}/leave")
    fun leaveLobby(@PathVariable("id") id: UUID, @AuthenticationPrincipal player: Player): ResponseEntity<*> {
        service.leaveLobby(id, player)
        return ResponseEntity.ok(mapOf("message" to "Left the lobby"))
    }

    @PostMapping("/{id}/start")
    fun startGame(@PathVariable("id") id: UUID, @AuthenticationPrincipal player: Player): ResponseEntity<GameDto> {
        val game = service.startGame(id, player)
        val dto = game.dto()

        return ResponseEntity.ok(dto)
    }
}