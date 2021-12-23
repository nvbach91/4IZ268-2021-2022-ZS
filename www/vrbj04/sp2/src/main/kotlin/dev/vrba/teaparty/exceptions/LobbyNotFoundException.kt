package dev.vrba.teaparty.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object LobbyNotFoundException : ResponseStatusException(HttpStatus.NOT_FOUND, "Lobby not found")