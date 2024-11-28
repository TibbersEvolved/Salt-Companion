package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.repositories.TopicRepository;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private TopicRepository topicRepository;

    public CardService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    private Topic getTopic(Long topicId) {
        return topicRepository.findById(topicId).get();
    }

    public void addCard(Long topicId, String question, String answer) {
        Topic topic = getTopic(topicId);
        topic.getDeck().addCard(new Card(question, answer, topic.getDeck()));
        topicRepository.save(topic);
    }
}
