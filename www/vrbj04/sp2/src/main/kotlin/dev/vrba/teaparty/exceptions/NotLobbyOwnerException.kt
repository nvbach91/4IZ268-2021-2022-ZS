package dev.vrba.teaparty.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object NotLobbyOwnerException : ResponseStatusException(HttpStatus.FORBIDDEN, "Only the lobby owner can start the game")