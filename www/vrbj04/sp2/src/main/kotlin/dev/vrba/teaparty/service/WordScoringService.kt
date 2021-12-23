package dev.vrba.teaparty.service

import dev.vrba.teaparty.domain.game.GameMode
import dev.vrba.teaparty.domain.game.ScoredWord
import dev.vrba.teaparty.domain.game.SubmittedWord
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class WordScoringService(@Value("\${wordlist.path:/wordlist.txt}") path: String) {

    private val words: Set<String> = javaClass.getResource(path)
        ?.readText()
        ?.lines()
        ?.map { it.trim().lowercase() }
        ?.filter { it.length >= 3 }
        ?.toSet() ?: throw IllegalArgumentException("Cannot find the specified wordlist resource [$path]")

    fun isValidWord(word: String): Boolean = words.contains(word.lowercase())

    fun score(mode: GameMode, word: SubmittedWord, syllable: String, previous: List<ScoredWord>): ScoredWord {
        // If the word is not a valid word, or it has been submitted before, automatically score it with -1 points
        if (!word.value.contains(syllable) || !isValidWord(word.value) || previous.any { it.value == word.value }) {
            return word.score(-1.0)
        }

        // Otherwise, proceed with scoring it based on the selected game mode
        return when (mode) {
            GameMode.GreenTea -> scoreGreenTea(word, previous)
            GameMode.YellowTea -> scoreYellowTea(word, previous)
            GameMode.RedTea -> scoreRedTea(word)
        }
    }

    // First word receives 3 points, second 2 points, third 1 point and all following 0 points
    private fun scoreGreenTea(word: SubmittedWord, previous: List<ScoredWord>): ScoredWord =
        word.score((3 - previous.size).coerceAtLeast(0).toDouble())

    // Every word receives points based on the number of words, the player has already submitted
    // plus a decimal amount based on the timestamp, that way, for example if two players score 5 words each,
    // The highest score will be the one who submitted the fifth word first
    private fun scoreYellowTea(word: SubmittedWord, previous: List<ScoredWord>): ScoredWord {
        val submitted = previous.count { it.player == word.player }
        val points = submitted + 1 + (1 / word.timestamp.toEpochMilli()).toDouble() // TODO: Maybe use different scoring mechanism because of float errors

        return word.score(points)
    }

    // Every word is scored based on its length plus a decimal amount based on timestamp, the same as with yellow tea
    private fun scoreRedTea(word: SubmittedWord): ScoredWord {
        val length = word.value.length
        val points = length + (1 / word.timestamp.toEpochMilli()).toDouble()

        return word.score(points)
    }
}