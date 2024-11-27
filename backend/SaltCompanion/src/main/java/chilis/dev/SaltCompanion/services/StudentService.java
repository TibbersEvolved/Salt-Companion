package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.controllers.BootcampController;
import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    StudentRepo studentRepo;
    BootCampRepository bootCampRepository;

    public StudentService(StudentRepo studentRepo, BootCampRepository bootCampRepository) {
        this.studentRepo = studentRepo;
        this.bootCampRepository = bootCampRepository;
    }

    public void createStudent(String name, String clerkId) {
        Student student = new Student(clerkId , name , bootCampRepository.findAll().get(0));
    }



}
