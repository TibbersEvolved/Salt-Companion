package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
import chilis.dev.SaltCompanion.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BootcampService {

    BootCampRepository bootCampRepository;
    TeacherRepository teacherRepository;

    public BootcampService(BootCampRepository bootCampRepository, TeacherRepository teacherRepository) {
        this.bootCampRepository = bootCampRepository;
        this.teacherRepository = teacherRepository;
        Teacher alek = new Teacher("Alek", "alek@saltEmail.com");
        Long id = addBootCamp("JFS",alek);
        Topic topic = new Topic("Java");
        addTopicToBootCamp(id,topic);
    }

    public Long addBootCamp(String name, Teacher teacher) {
        List<Topic> topics = new ArrayList<>();
        BootCamp bootCamp = new BootCamp(name, teacher, topics);
        teacher.addBootCamp(bootCamp);

        bootCampRepository.save(bootCamp);
        return bootCamp.getId();
    }

    public void addTopicToBootCamp(Long id, Topic topic) {
        BootCamp bootCamp = bootCampRepository.findById(id).get();
        //bootCamp.addTopic(topic);
        List<Topic> topics = new ArrayList();
        topics.addAll(bootCamp.getTopics());
        topic.setBootCamp(bootCamp);
        topics.add(topic);

        bootCamp.setTopics(topics);
        System.out.println("Get here before crashing");
        bootCampRepository.save(bootCamp);
    }

    public BootCamp getBootCamp(long id) {
        //Fetches a bootcamp by id.
        return null;
    }



}
