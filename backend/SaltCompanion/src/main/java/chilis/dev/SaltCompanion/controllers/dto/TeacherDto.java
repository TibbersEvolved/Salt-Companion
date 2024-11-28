package chilis.dev.SaltCompanion.controllers.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import org.springframework.lang.Nullable;

public record TeacherDto(
        @Pattern(regexp = "^[^0-9]+$", message = "Invalid name")
        @NotEmpty(message = "Invalid name")
        String name) {
}

