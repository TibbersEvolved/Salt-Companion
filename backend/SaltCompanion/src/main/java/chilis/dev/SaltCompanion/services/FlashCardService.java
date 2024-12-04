package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.*;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashCard;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashcardSession;
import chilis.dev.SaltCompanion.repositories.StudentRepo;
import chilis.dev.SaltCompanion.repositories.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FlashCardService {

    private List<FlashcardSession> sessions = new ArrayList<>();
    private StudentService studentService;
    private BootcampService bootcampService;
    private StudentRepo studentRepo;
    private TopicRepository topicRepository;
    private List<Card> cardsEasy = new ArrayList<>();
    private List<Card> cardsMedium = new ArrayList<>();
    private List<Card> cardsHard = new ArrayList<>();
    private List<Card> cardsImpossible = new ArrayList<>();
    private List<List<Card>> difficulties = new ArrayList<List<Card>>();


    public FlashCardService(StudentService studentService, BootcampService bootcampService, StudentRepo studentRepo, TopicRepository topicRepository) {
        this.studentService = studentService;
        this.bootcampService = bootcampService;
        this.studentRepo = studentRepo;
        this.topicRepository = topicRepository;
        difficulties.add(cardsImpossible);
        difficulties.add(cardsHard);
        difficulties.add(cardsMedium);
        difficulties.add(cardsEasy);
    }

    public void answerFlashCardDifficulty(int answer, UUID id) {
        FlashcardSession session = findSession(id);
        FlashCard flashCard = session.getCurrentCard();
        Student student = studentService.findStudentByClerkId(session.getClerkId());
        Optional<StudentTopicStat> topicStat = student.getStudentStats().stream()
                .filter(stat -> stat.getDeckId() == flashCard.getDeckId())
                .findFirst();
        if(topicStat.isPresent()) {
            StudentTopicCard studentTopicCard = topicStat.get().getCardByCardId(flashCard.getCardId());
            if(studentTopicCard != null) {
                studentTopicCard.setUserDifficulty(answer);
                studentRepo.save(student);
            }
        }
        else {
            Optional<Deck> deck = student.getBootCamp().getTopics().stream()
                    .map(s -> s.getDeck())
                    .filter(d -> d.getId() == flashCard.getDeckId())
                    .findFirst();
            StudentTopicStat statToAdd = new StudentTopicStat(deck.get().getTopic(),student);
            StudentTopicCard studentTopicCard = statToAdd.getCardByCardId(flashCard.getCardId());
            studentTopicCard.setUserDifficulty(answer);
            studentRepo.save(student);
        }
    }

    public FlashCard drawNewCard(UUID id) {
        FlashcardSession session = findSession(id);
        Student student = studentService.findStudentByClerkId(session.getClerkId());
        Integer draw = student.getTotalCardsFlipped();
        student.setTotalCardsFlipped(draw+1);
        student.updateLastDay();
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
        separateCards(selectableCards,clerkId);
        System.out.println("CardsImpossible size: " + cardsImpossible.size() );
        for(int i = 0; i < cardAmount; i++ ) {
            flashCardList.add(getCard(randomDifficulty(random),random));
        }
        FlashcardSession newSession = new FlashcardSession(flashCardList, clerkId);
        UUID identifier = newSession.getId();
        System.out.println("New Deck size: " + newSession.getFlashDeck().size());
        sessions.add(newSession);
        return identifier;
    }

    private void separateCards(List<Card> cards, String clerkId) {
        List<StudentTopicStat> stats = studentService.findStudentByClerkId(clerkId).getStudentStats();
        cardsEasy = new ArrayList<>();
        cardsMedium = new ArrayList<>();
        cardsHard = new ArrayList<>();
        cardsImpossible = new ArrayList<>();
        difficulties = new ArrayList<>();
        difficulties.add(cardsImpossible);
        difficulties.add(cardsHard);
        difficulties.add(cardsMedium);
        difficulties.add(cardsEasy);



        cards.forEach(s -> {
            for(int i = 0; i < stats.size(); i++) {
                if(stats.get(i).getDeckId() == s.getDeck().getId()) {
                    StudentTopicStat actStat = stats.get(i);
                    if(actStat.getCardByCardId(s.getId()) != null) {
                        sortCardByDifficulty(s, actStat.getCardByCardId(s.getId()).getUserDifficulty());
                        System.out.println("Added card: " + s + " with difficulty: " + actStat.getCardByCardId(s.getId()).getUserDifficulty());
                    }
                }
            }
        });
    }

    private void sortCardByDifficulty(Card card, int difficulty ) {
        if (difficulty == 0) {
            cardsImpossible.add(card);
        }
        if (difficulty == 1) {
            cardsHard.add(card);
        }
        if (difficulty == 2) {
            cardsMedium.add(card);
        }
        if (difficulty == 3) {
            cardsEasy.add(card);
        }
    }
    private List<Card> randomDifficulty(Random random) {
        int result = random.nextInt(9);
        System.out.println("result = " + result);
        if(result >= 0 || result <= 3) {
            return getDifficulty(0);
        }
        if(result >= 3 || result <= 6) {
            return getDifficulty(1);
        }
        if(result >= 7 || result <= 8) {
            return getDifficulty(2);
        }
        return getDifficulty(3);
    }

    private List<Card> getDifficulty(int index) {
        System.out.println("Difficulties: " + difficulties);
        if(difficulties.get(index).isEmpty()){
            for(int i = 0; i < difficulties.size(); i++) {
                if(difficulties.get(i).isEmpty() == false) {
                    return difficulties.get(i);
                }
            }
        }
        return difficulties.get(index);
    }
    private FlashCard getCard(List<Card> cards, Random random) {
        System.out.println("cards = " + cards);
        System.out.println("Testing with arraysize: " + cards.size());
        int index = random.nextInt(0,cards.size());
        Card card = cards.get(index);
        return new FlashCard(card.getDeck().getTopic(),card);
    }
}
