package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.controllers.BootcampController;
import chilis.dev.SaltCompanion.exceptions.StudentExistException;
import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        studentRepo.save(student);
    }

//    public Student findStudentByClerkId(String clerkId) {
//        List<Student> optionalStudent = studentRepo.findAllByClerkId(clerkId);
//        if(optionalStudent.isEmpty()) {
//            return null;
//        }
//        return optionalStudent.get(0);
//    }
public Student findStudentByClerkId(String clerkId) {
    Student student = studentRepo.findStudentByClerkId(clerkId);
    validateStudentExist(student);

    return student;
}

public boolean validateStudentExist(Student student) {
        if(student == null) {
            throw new StudentExistException("Student does not exist");
        }
    return true;
}



}
