package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashCard;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashcardSession;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.models.Topic;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FlashCardService {

    private List<FlashcardSession> sessions = new ArrayList<>();
    private StudentService studentService;
    private BootcampService bootcampService;

    public FlashCardService(StudentService studentService, BootcampService bootcampService) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;
    }

    public FlashCard drawNewCard(UUID id) {
        FlashcardSession session = findSession(id);
        Student student = studentService.findStudentByClerkId(session.getClerkId());
        Integer draw = student.getTotalCardsFlipped();
        student.setTotalCardsFlipped(draw+1);
        studentService.updateStudent(student);
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
    public UUID startNewSession(List<Topic> topics, int cardAmount, String clerkId) {
        List<FlashCard> flashCardList = new ArrayList<>();
        List<Card> selectableCards = new ArrayList<>();
        topics.forEach(s -> {
            selectableCards.addAll(s.getDeck().getDeckCards());
        });
        if (selectableCards.size() < cardAmount) {
            cardAmount = selectableCards.size();
        }
        Random random = new Random();
        for(int i = 0; i < cardAmount; i++ ) {
            System.out.println("ranLoop");
            int index = random.nextInt(0,selectableCards.size());
            Card card = selectableCards.get(index);
            String topic = card.getDeck().getTopic().getName();
            flashCardList.add(new FlashCard(topic,card.getText(),card.getAnswer()));
            selectableCards.remove(index);
        }
        FlashcardSession newSession = new FlashcardSession(flashCardList, clerkId);
        UUID identifier = newSession.getId();
        System.out.println("New Deck size: " + newSession.getFlashDeck().size());
        sessions.add(newSession);
        return identifier;
    }
}
