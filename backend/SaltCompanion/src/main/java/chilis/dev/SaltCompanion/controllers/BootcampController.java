package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.*;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateTopicDto;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.BootcampService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{name}")
    public ResponseEntity createBootCamp(@PathVariable String name) {
        Teacher teacher = new Teacher("FakeTeacher","mock@gmail.com");
        bootcampService.addBootCamp(name,teacher);
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
