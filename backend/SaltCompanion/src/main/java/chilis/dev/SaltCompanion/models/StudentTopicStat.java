package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
public class StudentTopicStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long deckId;
    private String topicName;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToMany(mappedBy = "studentTopicStat", cascade = CascadeType.ALL)
    private List<StudentTopicCard> studentTopicCards;

    public StudentTopicStat() {
    }

    public StudentTopicStat(Topic topic, Student student ) {
        this.student = student;
        this.topicName = topic.getName();
        deckId = topic.getDeck().getId();
        List<StudentTopicCard> cards = new ArrayList<>();
        topic.getDeck().getDeckCards().forEach(s -> {
            cards.add(new StudentTopicCard(s.getId(),this));
        });
        this.studentTopicCards = cards;
    }

    private StudentTopicCard addMissingStat(Long id) {
        StudentTopicCard card = new StudentTopicCard(id,this);
        studentTopicCards.add(card);
        return card;
    }



    public float getCertainty() {
        float certainty = 0;
        float threshHold = studentTopicCards.size()*3;
        for(int i = 0; i < studentTopicCards.size(); i++) {
            certainty += studentTopicCards.get(i).getUserDifficulty();
        }
        if(certainty == 0)
        return certainty;
        certainty /= threshHold;
        certainty *= 100;
        return certainty;
    }

    public String getTopicName() {
        return topicName;
    }

    public StudentTopicCard getCardByCardId(Long cardId) {
        Optional<StudentTopicCard> card = studentTopicCards.stream()
                .filter(c -> c.getCardId() == cardId)
                .findFirst();
        if(card.isEmpty()) {
            return addMissingStat(cardId);
        }
        return card.get();
    }

    public Long getDeckId() {
        return deckId;
    }

    public void setDeckId(Long deckId) {
        this.deckId = deckId;
    }
}
