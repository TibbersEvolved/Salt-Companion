package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.Exceptions.BootCampIdException;
import chilis.dev.SaltCompanion.Exceptions.UUIDException;
import chilis.dev.SaltCompanion.Exceptions.ValidateUUID;
import chilis.dev.SaltCompanion.controllers.dto.BootCampDto;
import chilis.dev.SaltCompanion.controllers.dto.BootCampListDto;
import chilis.dev.SaltCompanion.controllers.dto.TeacherDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateTeacherDto;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.services.TeacherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    private TeacherService teacherService;



    public TeacherController(TeacherService teacherService, ValidateUUID validate) {
        this.teacherService = teacherService;

    }

    @PostMapping
    public ResponseEntity createTeacher(@RequestBody CreateTeacherDto teacherDto) {
        teacherService.createTeacher(teacherDto.clerkId(),teacherDto.name(),teacherDto.email());
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/{id}")
    public TeacherDto findTeacherById(@PathVariable  String id) {

        Teacher teacher = teacherService.findTeacherByClerkId(id);
        return new TeacherDto(teacher.getName());
    }

    @GetMapping("/bootcamps/{id}")
    public ResponseEntity<BootCampListDto> getTeacherBootCamps(@PathVariable String id) {



        Teacher teacher = teacherService.findTeacherByClerkId(id);
        List<BootCampDto> bootCampDtoList = new ArrayList<>();
        teacher.getBootCampList().forEach(s -> {
            bootCampDtoList.add(new BootCampDto(s.getName(),s.getId(),teacher.getName()));
        });
        return ResponseEntity.ok(new BootCampListDto(bootCampDtoList));
    }



}
