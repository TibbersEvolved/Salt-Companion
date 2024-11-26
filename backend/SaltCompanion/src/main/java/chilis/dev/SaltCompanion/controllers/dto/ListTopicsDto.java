package chilis.dev.SaltCompanion.controllers.dto;

import chilis.dev.SaltCompanion.models.Topic;

import java.util.List;

public record ListTopicsDto(List<Long> topics) {
}
