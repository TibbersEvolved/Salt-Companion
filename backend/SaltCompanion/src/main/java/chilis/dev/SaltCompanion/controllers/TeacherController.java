package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dtoInput.CreateTeacherDto;
import chilis.dev.SaltCompanion.services.TeacherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    private TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    public ResponseEntity createTeacher(@RequestBody CreateTeacherDto teacherDto) {
        teacherService.createTeacher(teacherDto.clerkId(),teacherDto.name(),teacherDto.email());
        return ResponseEntity.status(201).build();
    }
}
