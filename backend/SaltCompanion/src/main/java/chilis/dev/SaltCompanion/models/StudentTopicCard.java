package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;

@Entity
public class StudentTopicCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer userDifficulty;
    private Long cardId;

    @ManyToOne
    @JoinColumn(name = "studentStat_id")
    private StudentTopicStat studentTopicStat;

    public StudentTopicCard(Long cardId, StudentTopicStat studentTopicStat) {
        this.cardId = cardId;
        this.userDifficulty = 0;
        this.studentTopicStat = studentTopicStat;
    }

    public StudentTopicCard() {
    }
    

    public Integer getUserDifficulty() {
        if(userDifficulty == null) {
            userDifficulty = 4;
        }
        return userDifficulty;
    }

    public void setUserDifficulty(Integer userDifficulty) {
        this.userDifficulty = userDifficulty;
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }
}
