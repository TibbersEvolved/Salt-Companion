package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.exceptions.ValidateUUID;
import chilis.dev.SaltCompanion.controllers.dto.BootCampDto;
import chilis.dev.SaltCompanion.controllers.dto.BootCampListDto;
import chilis.dev.SaltCompanion.controllers.dto.TeacherDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateTeacherDto;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.services.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/teachers")
@Tag(name = "Teacher API", description = "Create, Delete Teacher")
public class TeacherController {

    private TeacherService teacherService;

    public TeacherController(TeacherService teacherService, ValidateUUID validate) {
        this.teacherService = teacherService;

    }

    @PostMapping
    public ResponseEntity createTeacher(@RequestBody @Valid CreateTeacherDto teacherDto) {
        teacherService.createTeacher(teacherDto.clerkId(),teacherDto.name(),teacherDto.email());
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/{id}")
    public TeacherDto findTeacherById(@PathVariable  String id) {

        Teacher teacher = teacherService.findTeacherByClerkId(id);
        return new TeacherDto(teacher.getName());
    }

    @GetMapping("/bootcamps/{clerkId}")
    @Operation(
            summary = "Gets all bootcamps of a teacher",
            description = "path variable is the clerkId of the teacher")
    public ResponseEntity<BootCampListDto> getTeacherBootCamps(@PathVariable String clerkId) {

        Teacher teacher = teacherService.findTeacherByClerkId(clerkId);
        List<BootCampDto> bootCampDtoList = new ArrayList<>();
        teacher.getBootCampList().forEach(s -> {
            bootCampDtoList.add(new BootCampDto(s.getName(),s.getId(),teacher.getName()));
        });
        return ResponseEntity.ok(new BootCampListDto(bootCampDtoList));
    }



}
