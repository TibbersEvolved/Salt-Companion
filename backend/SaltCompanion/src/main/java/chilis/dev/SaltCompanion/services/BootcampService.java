package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.*;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
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

    public BootcampService(BootCampRepository bootCampRepository, TeacherRepository teacherRepository, TopicRepository topicRepository) {
        this.bootCampRepository = bootCampRepository;
        this.topicRepository = topicRepository;
        this.teacherRepository = teacherRepository;
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

public Topic findBootCampTopic(Long bootCampId, String topicName){
        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
        validateBootCamp(bootCamp);
        List<Topic> topics = topicRepository.findAllByBootCamp_Id(bootCampId);
        for(Topic topic: topics){
            if(topic.getName().equals(topicName)){
                return topic;
            }
        }
        return null;
}

    public BootCamp getBootCamp(long id) {
        return bootCampRepository.findById(id).get();
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
       validateBootCamp(bootCamp);

        student.setBootCamp(bootCamp);
        bootCamp.addStudent(student);
        bootCampRepository.save(bootCamp);
    }
    @Transactional
    public boolean removeStudent(Long bootCampId, Long StudentId){

        BootCamp bootCamp = bootCampRepository.findById(bootCampId).get();
        validateBootCamp(bootCamp);

        if(bootCamp.findStudent(StudentId)){
           bootCamp.removeStudent(StudentId);

            bootCampRepository.save(bootCamp);

           return true;
        }
        return false;
    }

    public boolean validateBootCamp(BootCamp bootCamp){

        if(bootCamp==null){
            throw new NullPointerException("Bootcamp not found");
        }
        return true;
    }
}
