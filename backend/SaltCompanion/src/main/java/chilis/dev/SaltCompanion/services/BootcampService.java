package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Deck;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
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

    public Long addBootCamp(String name, Teacher teacher) {
        BootCamp bootCamp = new BootCamp(name, teacher);
        teacher.addBootCamp(bootCamp);
        bootCampRepository.save(bootCamp);
        return bootCamp.getId();
    }

    public void addTopicToBootCamp(Long id, Topic topic) {
        BootCamp bootCamp = bootCampRepository.findById(id).get();
        List<Topic> topics = topicRepository.findAllByBootCamp_Id(id);
        topic.setBootCamp(bootCamp);
        topics.add(topic);
        bootCamp.setTopics(topics);
        bootCampRepository.save(bootCamp);
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
}
