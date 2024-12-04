package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.repositories.CardRepository;
import chilis.dev.SaltCompanion.repositories.TopicRepository;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private TopicRepository topicRepository;
    private CardRepository cardRepository;

    public CardService(TopicRepository topicRepository, CardRepository cardRepository) {
        this.topicRepository = topicRepository;
        this.cardRepository = cardRepository;
    }

    public Topic getTopic(Long topicId) {
        return topicRepository.findById(topicId).get();
    }



    public void updateCard(Long cardId, String question, String answer) {
        Card card = cardRepository.findById(cardId).get();
        card.setAnswer(answer);
        card.setText(question);
        cardRepository.save(card);
    }

    public void deleteCard(Long cardId) {
        Card card = cardRepository.findById(cardId).get();
        Topic topic = card.getDeck().getTopic();
        card.getDeck().removeCard(cardId);
        cardRepository.delete(card);
        topicRepository.save(topic);
    }

    public void addCard(Long topicId, String question, String answer) {
        Topic topic = getTopic(topicId);
        topic.getDeck().addCard(new Card(question, answer, topic.getDeck()));
        topicRepository.save(topic);
//        just adding something
    }
}
