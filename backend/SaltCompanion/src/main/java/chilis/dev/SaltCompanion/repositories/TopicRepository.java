package chilis.dev.SaltCompanion.repositories;

import chilis.dev.SaltCompanion.models.Topic;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends ListCrudRepository<Topic, Long> {

    public List<Topic> findAllByBootCamp_Id(long id);
}
