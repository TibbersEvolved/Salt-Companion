package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.*;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateStudentDto;
import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.StudentService;
import chilis.dev.SaltCompanion.services.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private StudentService studentService;
    private BootcampService bootcampService;
    private BootcampController bootcampController;
    private TeacherService teacherService;

    public StudentController(StudentService studentService, BootcampService bootcampService,
                             BootcampController bootcampController, TeacherService teacherService) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;
        this.bootcampController = bootcampController;
        this.teacherService = teacherService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDetailedInfoDto> getStudentInfo(@PathVariable String id) {
        Student student = studentService.findStudentByClerkId(id);
        if(student == null) {
            return ResponseEntity.status(400).build();
        }
        BootCamp bootcamp = student.getBootCamp();
        ListDetailedTopicsDto studentTopics = bootcampController.
                getListTopicsDto(bootcamp.getId());
        return ResponseEntity.ok(new StudentDetailedInfoDto(student.getName(),
                bootcamp.getName(), studentTopics,student.getStreakRecord(),student.getCurrentStreak(), student.getTotalCardsFlipped(), getStudentTopicStats(student)));
    }

    @PostMapping
    public ResponseEntity createStudent(@RequestBody CreateStudentDto input) {
        studentService.createStudent(input.name(),input.clerkId());
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/delete/{clerkId}")
    public ResponseEntity <String> deleteStudent(@PathVariable String clerkId){

        studentService.deleteStudentByClerkId(clerkId);

        return ResponseEntity.status(200).body("Student " + clerkId + " deleted");
    }


    @GetMapping("/user/{clerkId}")
    @Operation(
            summary = "Gets user status",
            description = "0 = not registered, 1 = isStudent, 2= isTeacher")
    public ResponseEntity<ValidUserDto> checkUserType(@PathVariable String clerkId) {
        if(!studentService.isUserStudent(clerkId)) {
             return ResponseEntity.ok(new ValidUserDto(1));
        }
        if(!teacherService.isUserTeacher(clerkId)) {
            return ResponseEntity.ok(new ValidUserDto(2));
        }
        return ResponseEntity.ok(new ValidUserDto(0));
    }

    private List<TopicStats> getStudentTopicStats(Student student) {
        List<TopicStats> stats = new ArrayList<>();
        studentService.getTopicStats(student).forEach(s -> {
            stats.add(new TopicStats(s.getTopicName(),s.getCertainty()));
        });
        return stats;
    }

}
