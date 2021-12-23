package dev.vrba.teaparty.domain.game

enum class GameMode(val scoring: ScoringType) {
    GreenTea(ScoringType.TopThree),
    YellowTea(ScoringType.Single),
    RedTea(ScoringType.Single)
}