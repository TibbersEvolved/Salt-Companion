package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashCard;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashcardSession;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CardService {

    private List<FlashcardSession> sessions = new ArrayList<>();
    private StudentService studentService;
    private BootcampService bootcampService;

    public CardService(StudentService studentService, BootcampService bootcampService) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;
    }

    public FlashCard drawNewCard(UUID id) {
        FlashcardSession session = findSession(id);
        return session.drawNext();
    }

    public int getCardsLeft(UUID id) {
        FlashcardSession session = findSession(id);
        return session.getCardsLeft();
    }

    public boolean isSessionDone(UUID id) {
        FlashcardSession session = findSession(id);
        return (session.getFlashDeck().size()-1 == session.getIndex());
    }

    private FlashcardSession findSession(UUID id) {
        Optional<FlashcardSession> session = sessions.stream()
                .filter(s -> s.getId().equals(id))
                .findFirst();
        if(session.isEmpty()) {
            return null;
        }
        return session.get();
    }
    public UUID startNewSession(List<Topic> topics, int cardAmount) {
        List<FlashCard> flashCardList = new ArrayList<>();
        List<Card> selectableCards = new ArrayList<>();
        topics.forEach(s -> {
            selectableCards.addAll(s.getDeck().getDeckCards());
        });
        if (selectableCards.size() > cardAmount) {
            cardAmount = selectableCards.size();
        }
        Random random = new Random();
        for(int i = 0; cardAmount < i; i++ ) {
            int index = random.nextInt(0,selectableCards.size());
            Card card = selectableCards.get(index);
            String topic = card.getDeck().getTopic().getName();
            flashCardList.add(new FlashCard(topic,card.getText(),card.getAnswer()));
            selectableCards.remove(index);
        }
        FlashcardSession newSession = new FlashcardSession(flashCardList);
        UUID identifier = newSession.getId();
        sessions.add(newSession);
        return identifier;
    }
}
