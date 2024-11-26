package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.BootCampDto;
import chilis.dev.SaltCompanion.controllers.dto.BootCampListDto;
import chilis.dev.SaltCompanion.controllers.dto.ListTopicsDto;
import chilis.dev.SaltCompanion.controllers.dto.TeacherDto;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.services.BootcampService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bootcamps")
public class BootcampController {

    BootcampService bootcampService;

    public BootcampController(BootcampService bootcampService) {
        this.bootcampService = bootcampService;
    }

    @GetMapping("/topic/{id}")
    public ResponseEntity<ListTopicsDto> getCoursesFromBootcamp(@PathVariable int id) {
        List<Long> topicIds = bootcampService.getTopicsForBootCamp(id).stream()
                .map(s -> s.getId())
                .toList();
        return ResponseEntity.ok(new ListTopicsDto(topicIds));
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<TeacherDto> getTeacherFromBootCamp(@PathVariable int id) {
        return ResponseEntity.ok(new TeacherDto(bootcampService.getTeacher(id).getName()));
    }

    @GetMapping()
    public ResponseEntity<BootCampListDto> getAllBootCamps() {
        List<BootCampDto> bootCampDtos = new ArrayList<>();
        bootcampService.getAllBootCamps().forEach(bootCamp -> {
            bootCampDtos.add(new BootCampDto(
                    bootCamp.getName(),bootCamp.getId(),bootCamp.getTeacher().getName()
            ));
        });
        return ResponseEntity.ok(new BootCampListDto(bootCampDtos));
    }
}
