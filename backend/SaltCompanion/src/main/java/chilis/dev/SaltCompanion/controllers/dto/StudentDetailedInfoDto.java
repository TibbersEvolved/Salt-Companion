package chilis.dev.SaltCompanion.controllers.dto;

public record StudentDetailedInfoDto(String name, String bootcamp, ListDetailedTopicsDto topics, int streak, int currentStrek, int totalCardsFlipped) {
}
