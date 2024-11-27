package chilis.dev.SaltCompanion.controllers.dtoInput;

import java.util.List;

public record CreateFlashSessionDto(int cards, List<Long> topicIdList, String userId) {
}
