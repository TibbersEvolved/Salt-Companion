package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.*;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateBootCampDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateTopicDto;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.TeacherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bootcamps")
public class BootcampController {

    private BootcampService bootcampService;
    private TeacherService teacherService;

    public BootcampController(BootcampService bootcampService, TeacherService teacherService) {
        this.bootcampService = bootcampService;
        this.teacherService = teacherService;
    }

    @GetMapping("/topic/{id}")
    public ResponseEntity<ListDetailedTopicsDto> getCoursesFromBootcamp(@PathVariable Long id) {
        return ResponseEntity.ok(getListTopicsDto(id));
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

    @PostMapping
    public ResponseEntity createBootCamp(@RequestBody CreateBootCampDto dto) {
        Teacher teacher = teacherService.findTeacherByClerkId(dto.clerkId());
        bootcampService.addBootCamp(dto.name(),teacher);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/topic/add")
    public ResponseEntity addTopic(@RequestBody CreateTopicDto dto) {
        Topic topic = new Topic(dto.name());
        bootcampService.addTopicToBootCamp(dto.id(), topic);
        return ResponseEntity.status(201).build();
    }

    public ListDetailedTopicsDto getListTopicsDto(Long bootCampId) {
        List<TopicDto> payload = new ArrayList<>();
        bootcampService.getTopicsForBootCamp(bootCampId).forEach(s -> {
            payload.add(new TopicDto(s.getId(),s.getName()));
        });
        return new ListDetailedTopicsDto(payload);
    }
}
