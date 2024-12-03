package chilis.dev.SaltCompanion.models.FlashcardPlaySession;

import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.Topic;

public class FlashCard {
    private String topic;
    private String question;
    private String answer;
    private Long deckId;
    private Long cardId;

    public FlashCard(Topic inputTopic, Card card) {
        this.topic = inputTopic.getName();
        this.question = card.getText();
        this.answer = card.getAnswer();
        this.deckId = inputTopic.getDeck().getId();
        this.cardId = card.getId();
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Long getDeckId() {
        return deckId;
    }

    public Long getCardId() {
        return cardId;
    }
}
