package dev.vrba.teaparty.security

object SecurityUtils {
    private val tokenCharacters = ('a'..'z') + ('A'..'Z') + ('0'..'9')

    fun generateRandomToken(length: Int = 64): String =
        List(length) { tokenCharacters.random() }.joinToString("")
}