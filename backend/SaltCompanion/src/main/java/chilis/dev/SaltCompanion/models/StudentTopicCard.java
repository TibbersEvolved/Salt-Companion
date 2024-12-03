package chilis.dev.SaltCompanion.models;

public class StudentTopicCard {

    private Long id;
    private Card card;
    private Integer userDifficulty;

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
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
}
