package dev.vrba.teaparty.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object NotJoinedInLobbyException : ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "You are not joined in this lobby")