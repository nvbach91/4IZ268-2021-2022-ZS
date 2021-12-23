package dev.vrba.teaparty.domain.game

enum class GameMode(scoring: ScoringType) {
    GreenTea(ScoringType.TopThreeWords),
    YellowTea(ScoringType.Single),
    RedTea(ScoringType.Single)
}