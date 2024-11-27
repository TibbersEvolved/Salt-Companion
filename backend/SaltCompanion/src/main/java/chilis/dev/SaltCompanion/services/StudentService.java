package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.controllers.BootcampController;
import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    StudentRepo studentRepo;
    BootcampController bootcampController;

    public StudentService(StudentRepo studentRepo, BootcampController bootcampController) {
        this.studentRepo = studentRepo;
        this.bootcampController = bootcampController;
    }

    public void createStudent(String name, String clerkId, BootCamp bootCamp) {
    }



}
