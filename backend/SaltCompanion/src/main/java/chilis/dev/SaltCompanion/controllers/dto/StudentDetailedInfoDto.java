package chilis.dev.SaltCompanion.controllers.dto;

import java.util.List;

public record StudentDetailedInfoDto(String name, String bootcamp, ListDetailedTopicsDto topics, int streak, int currentStreak, int totalCardsFlipped, List<TopicStats> topicStats) {
}
