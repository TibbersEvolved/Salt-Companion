package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.exceptions.BootCampIdException;
import chilis.dev.SaltCompanion.controllers.dto.*;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateBootCampDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateTopicDto;
import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.StudentService;
import chilis.dev.SaltCompanion.services.TeacherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/bootcamps")
public class BootcampController {

    private BootcampService bootcampService;
    private TeacherService teacherService;
    private StudentService studentService;

    public BootcampController(BootcampService bootcampService, TeacherService teacherService, StudentService studentService) {
        this.bootcampService = bootcampService;
        this.teacherService = teacherService;
        this.studentService = studentService;
    }

    @GetMapping("/{bootcampId}")
    public ResponseEntity<BootCampDto> getBootCamp(@PathVariable Long bootcampId) {
        validateBootCampId(bootcampId);

        BootCamp bootCamp = bootcampService.getBootCamp(bootcampId);

        BootCampDto response = new BootCampDto(
                bootCamp.getName(),
                bootCamp.getId(),
                bootCamp.getTeacher().getName()
        );
        return ResponseEntity.ok(response);
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
                    bootCamp.getName(), bootCamp.getId(), bootCamp.getTeacher().getName()
            ));
        });
        return ResponseEntity.ok(new BootCampListDto(bootCampDtos));
    }

    @PostMapping
    public ResponseEntity createBootCamp(@RequestBody CreateBootCampDto dto) {
        Teacher teacher = teacherService.findTeacherByClerkId(dto.clerkId());
        bootcampService.addBootCamp(dto.name(), teacher);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/topic/add")
    public ResponseEntity addTopic(@RequestBody CreateTopicDto dto) {
        Topic topic = new Topic(dto.name());
        bootcampService.addTopicToBootCamp(dto.id(), topic);
        return ResponseEntity.status(201).build();
    }

    public ListDetailedTopicsDto getListTopicsDto(Long bootCampId) {

        validateBootCampId(bootCampId);

        List<TopicDto> payload = new ArrayList<>();
        bootcampService.getTopicsForBootCamp(bootCampId).forEach(s -> {
            payload.add(new TopicDto(s.getId(), s.getName()));
        });
        return new ListDetailedTopicsDto(payload);
    }

    @PostMapping("/student/add/{clerkId}{bootCampId}")
    public ResponseEntity addStudent(@PathVariable String clerkId, @PathVariable Long bootCampId) {

        Student student = studentService.findStudentByClerkId(clerkId);
        bootcampService.addStudent(bootCampId,student);

        return ResponseEntity.status(201).build();

    }

    @DeleteMapping("/student/remove/{clerkId}{bootCampId}")
    public ResponseEntity removeStudent(@PathVariable String clerkId, @PathVariable Long bootCampId) {

        Student student = studentService.findStudentByClerkId(clerkId);
        bootcampService.removeStudent(bootCampId,student.getClerkId());

        return ResponseEntity.status(200).build();

    }


    public boolean validateBootCampId(Long bootCampId) {


        if (bootCampId == null) {
            throw new BootCampIdException("Bootcamp id must be a long");
        }

        if (bootCampId < 1) {
            throw new BootCampIdException("Bootcamp id must be a long greater than 1");
        }


        return true;

    }


}
