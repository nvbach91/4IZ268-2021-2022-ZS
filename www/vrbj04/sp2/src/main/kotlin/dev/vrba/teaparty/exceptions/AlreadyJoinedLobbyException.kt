package dev.vrba.teaparty.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object AlreadyJoinedLobbyException : ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "You already joined this lobby")