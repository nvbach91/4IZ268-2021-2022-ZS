package dev.vrba.teaparty.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

object GameNotFoundException : ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found")