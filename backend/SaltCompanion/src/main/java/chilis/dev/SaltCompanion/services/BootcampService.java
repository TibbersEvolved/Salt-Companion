package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.controllers.dto.StudentDetailedInfoDto;
import chilis.dev.SaltCompanion.controllers.dto.StudentSimpleDto;
import chilis.dev.SaltCompanion.exceptions.BootCampExistException;
import chilis.dev.SaltCompanion.models.*;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import chilis.dev.SaltCompanion.repositories.TeacherRepository;
import chilis.dev.SaltCompanion.repositories.TopicRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BootcampService {

    BootCampRepository bootCampRepository;
    TeacherRepository teacherRepository;
    TopicRepository topicRepository;
    StudentRepo studentRepo;


    public BootcampService(BootCampRepository bootCampRepository, TeacherRepository teacherRepository,
                           TopicRepository topicRepository, StudentRepo studentRepo) {
        this.bootCampRepository = bootCampRepository;
        this.topicRepository = topicRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepo = studentRepo;
    }

    public void saveBootcamp(BootCamp bootCamp){
        bootCampRepository.save(bootCamp);
    }

    @Transactional
    public Long addBootCamp(String name, Teacher teacher) {
        BootCamp bootCamp = new BootCamp(name, teacher);
        teacher.addBootCamp(bootCamp);
        bootCamp.setTeacher(teacher);
//        teacherRepository.save(teacher);

        bootCampRepository.save(bootCamp);
        return bootCamp.getId();
    }
    @Transactional
    public void addTopicToBootCamp(Long id, Topic topic) {
        BootCamp bootCamp = bootCampRepository.findById(id).get();
        List<Topic> topics = topicRepository.findAllByBootCamp_Id(id);
        topic.setBootCamp(bootCamp);
        topics.add(topic);
        bootCamp.setTopics(topics);
        bootCampRepository.save(bootCamp);
    }

    public void changeTopicName(String name, Long id) {
        Topic topic = topicRepository.findById(id).get();
        topic.setName(name);
        topicRepository.save(topic);
    }

    public void deleteTopic(Long topicId) {
        topicRepository.deleteById(topicId);
    }

public Topic findBootCampTopic(Long bootCampId, String topicName){
        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
        validateBootCampExist(bootCamp);
        List<Topic> topics = topicRepository.findAllByBootCamp_Id(bootCampId);
        for(Topic topic: topics){
            if(topic.getName().equals(topicName)){
                return topic;
            }
        }
        return null;
}

    public BootCamp getBootCamp(long id) {
        BootCamp bootCamp = bootCampRepository.findById(id).orElse(null);
        System.out.println("This is the bootcamp ...");
        validateBootCampExist(bootCamp);
        return bootCamp;
    }

    @Transactional
    public boolean deleteBootCamp(Long id){
        BootCamp bootCamp = getBootCamp(id);
        bootCampRepository.delete(bootCamp);
        if(getBootCamp(id)!=null){
            return false;
        }
        return true;
    }

    public List<Topic> getTopicsForBootCamp(long id) {
        return topicRepository.findAllByBootCamp_Id(id);
    }

    public List<BootCamp> getAllBootCamps() {
        return bootCampRepository.findAll();
    }

    public Teacher getTeacher(long id) {
        return bootCampRepository.findById(id).get().getTeacher();
    }
    @Transactional
    public void addStudent(Long bootCampId, Student student){
        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
       validateBootCampExist(bootCamp);
        if(student==null){
            throw new BootCampExistException("Student not found");
        }
        student.setBootCamp(bootCamp);
        bootCamp.addStudent(student);
        bootCampRepository.save(bootCamp);
    }
    @Transactional
    public boolean removeStudent(Long bootCampId, String clerkId){

        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
        validateBootCampExist(bootCamp);

        if(bootCamp.findStudent(clerkId)){
           bootCamp.removeStudent(clerkId);

            bootCampRepository.save(bootCamp);

           return true;
        }
        return false;
    }

    public List<StudentSimpleDto> getStudentsFromBootCamp(Long bootCampId) {
        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
        validateBootCampExist(bootCamp);
        List<Student> students = bootCamp.getStudents();
        List<StudentSimpleDto> studentSimpleList = new java.util.ArrayList<>();
        for (Student student : students) {
            studentSimpleList.add(new StudentSimpleDto(student.getClerkId(), student.getName(), bootCamp.getId(), student.getBootCampName()));

        }
        return studentSimpleList;
    }

    public List<StudentSimpleDto> getUnlistedStudents(){
        List<StudentSimpleDto> studentSimpleList = new ArrayList<>();
        List<Student> students = studentRepo.findAll();
        for(Student student: students){
            if(student.getBootCamp()==null){
                studentSimpleList.add(new StudentSimpleDto(student.getClerkId(), student.getName(), null, null));
            }
        }
        return studentSimpleList;
    }

    public String getBootCampName(Long bootCampId){
        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
        validateBootCampExist(bootCamp);
        return bootCamp.getName();
    }

    public String getTopicName(Long topicId){
        Topic topic = topicRepository.findById(topicId).get();
        return topic.getName();
    }

    public boolean validateBootCampExist(BootCamp bootCamp) {

        if (bootCamp == null) {
            throw new BootCampExistException("Bootcamp not found");
        }
        return true;
    }
}
