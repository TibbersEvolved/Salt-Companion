package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.ListDetailedTopicsDto;
import chilis.dev.SaltCompanion.controllers.dto.ListTopicsDto;
import chilis.dev.SaltCompanion.controllers.dto.StudentDetailedInfoDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateStudentDto;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private StudentService studentService;
    private BootcampService bootcampService;
    private BootcampController bootcampController;

    public StudentController(StudentService studentService, BootcampService bootcampService, BootcampController bootcampController) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;
        this.bootcampController = bootcampController;
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDetailedInfoDto> getStudentInfo(@PathVariable String id) {
        Student student = studentService.findStudentByClerkId(id);
        if(student == null) {
            return ResponseEntity.status(400).build();
        }
        ListDetailedTopicsDto studentTopics = bootcampController.
                getListTopicsDto(student.getBootCamp().getId());
        return ResponseEntity.ok(new StudentDetailedInfoDto(student.getName(),
                student.getBootCamp().getName(), studentTopics));
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

}
