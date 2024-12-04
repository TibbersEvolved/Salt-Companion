package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.controllers.BootcampController;
import chilis.dev.SaltCompanion.controllers.dto.StudentSimpleDto;
import chilis.dev.SaltCompanion.exceptions.StudentExistException;
import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.models.StudentTopicStat;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private StudentRepo studentRepo;
    private BootCampRepository bootCampRepository;
    private BootcampService bootcampService;

    public StudentService(StudentRepo studentRepo, BootCampRepository bootCampRepository, BootcampService bootcampService) {
        this.studentRepo = studentRepo;
        this.bootCampRepository = bootCampRepository;
        this.bootcampService = bootcampService;
    }

    public void createStudent(String name, String clerkId) {
        Student student = new Student(clerkId , name , bootCampRepository.findAll().get(0));
        studentRepo.save(student);
    }

    public void updateStudent(Student student) {
        studentRepo.save(student);
    }

    public List<StudentTopicStat> getTopicStats(Student student) {
        List<StudentTopicStat> stats = student.getStudentStats();
        if(stats == null || stats.isEmpty()) {
            return initCardStats(student);
        }
        if(stats.size() != student.getBootCamp().getTopics().size()) {
            return updateMissingStats(student, stats);
        }
        return stats;
    }

    public List<StudentSimpleDto> getAllStudents() {
        List<Student> students = studentRepo.findAll();
        List<StudentSimpleDto> studentSimpleDtos = new ArrayList<>();
        students.forEach(s -> studentSimpleDtos.add(new StudentSimpleDto(s.getClerkId(), s.getName(), s.getBootCamp().getId(), s.getBootCamp().getName())));
        return studentSimpleDtos;
    }

    private List<StudentTopicStat> updateMissingStats(Student student, List<StudentTopicStat> stats ) {
        List<Topic> topicList = student.getBootCamp().getTopics();
        topicList.forEach(s ->{
            boolean found = false;
            for(int i = 0; i < stats.size(); i++) {
                if(stats.get(i).getDeckId() == s.getDeck().getId()){
                    found = true;
                    break;
                }
            }
            if(!found) {
                stats.add(new StudentTopicStat(s,student));
            }
        });
        return stats;
    }

    private List<StudentTopicStat> initCardStats(Student student) {
        List<StudentTopicStat> stats = new ArrayList<>();
        bootcampService.getTopicsForBootCamp(student.getBootCamp().getId()).forEach(s -> {
            stats.add(new StudentTopicStat(s,student));
        });
        student.setStudentStats(stats);
        studentRepo.save(student);
        return stats;
    }




public Student findStudentByClerkId(String clerkId) {
        List<Student> students = studentRepo.findAllByClerkId(clerkId);
        if(students.isEmpty() || students == null){
            throw new StudentExistException("Not found");
        }
        Student student = students.get(0);
        return student;
}

public boolean isUserStudent(String clerkId) {
    Student student = studentRepo.findStudentByClerkId(clerkId);
    return (student == null);
}

public void deleteStudentByClerkId(String clerkId){
        Student student = studentRepo.findStudentByClerkId(clerkId);
        validateStudentExist(student);

        studentRepo.delete(student);

    System.out.println("Student " + clerkId + " deleted");
}

public boolean validateStudentExist(Student student) {
        if(student == null) {
            throw new StudentExistException("Student does not exist");
        }
    return true;
}



}
