package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.BootCamp;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.repositories.BootCampRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BootcampService {

    BootCampRepository bootCampRepository;

    public BootcampService(BootCampRepository bootCampRepository) {
        this.bootCampRepository = bootCampRepository;
        Teacher alek = new Teacher("Alek", "alek@saltEmail.com");
        Long id = addBootCamp("JFS",alek);
        Topic topic = new Topic("Java");
        addTopicToBootCamp(id,topic);
    }

    public Long addBootCamp(String name, Teacher teacher) {
        BootCamp bootCamp = new BootCamp(name, teacher);
        bootCampRepository.save(bootCamp);
        return bootCamp.getId();
    }

    public void addTopicToBootCamp(Long id, Topic topic) {
        BootCamp bootCamp = bootCampRepository.findById(id).get();
        bootCamp.addTopic(topic);
        bootCampRepository.save(bootCamp);
    }

    public BootCamp getBootCamp(long id) {
        //Fetches a bootcamp by id.
        return null;
    }



}
