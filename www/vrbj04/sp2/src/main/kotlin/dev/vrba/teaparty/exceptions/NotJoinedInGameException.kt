package dev.vrba.teaparty.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object NotJoinedInGameException : ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Sorry, you was not invited to this game")