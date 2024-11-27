package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashCard;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashcardSession;
import chilis.dev.SaltCompanion.models.Topic;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CardService {

    private List<FlashcardSession> sessions = new ArrayList<>();
    private StudentService studentService;
    private BootcampService bootcampService;

    public CardService(StudentService studentService, BootcampService bootcampService) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;

    }

    public UUID startNewSession(List<Topic> topics, int cardAmount) {
        List<FlashCard> cards = new ArrayList<>();
        List<Card> selectableCards = new ArrayList<>();
        return UUID.randomUUID();
    }
}
