package dev.vrba.teaparty.controller

import dev.vrba.teaparty.domain.Player
import dev.vrba.teaparty.dto.PlayerDto
import dev.vrba.teaparty.dto.dto
import dev.vrba.teaparty.service.PlayersService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.annotation.Secured
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.NotBlank

@Validated
@RestController
@RequestMapping("/api/authentication")
class AuthenticationController(private val playersService: PlayersService) {

    data class CreateAccountRequest(@Min(3) @Max(16) @NotBlank val username: String)

    data class CreateAccountResponse(val player: PlayerDto, val token: String)

    @PostMapping("/create-account")
    fun createAccount(@Valid @RequestBody request: CreateAccountRequest): ResponseEntity<CreateAccountResponse> {
        val account = playersService.createPlayerAccount(request.username)
        val response = CreateAccountResponse(
            player = account.dto(),
            token = account.token
        )

        return ResponseEntity.ok(response)
    }

    @Secured("ROLE_PLAYER")
    @PostMapping("/check")
    fun check(@AuthenticationPrincipal player: Player): ResponseEntity<PlayerDto> {
        return ResponseEntity.ok(player.dto())
    }
}