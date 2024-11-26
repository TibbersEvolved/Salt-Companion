package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.ListTopicsDto;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private StudentService studentService;
    private BootcampService bootcampService;

    public StudentController(StudentService studentService, BootcampService bootcampService) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;
    }

    @GetMapping("/{id}")
    public void getAllTopics(@PathVariable String id) {
        //gets ListDetailedTopicsDto to send to frontend.
    }
}
