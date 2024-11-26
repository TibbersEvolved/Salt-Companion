package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    StudentRepo studentRepo;

    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    public void createStudent(String name, String clerkId, BootCamp bootCamp) {
        
    }

}
