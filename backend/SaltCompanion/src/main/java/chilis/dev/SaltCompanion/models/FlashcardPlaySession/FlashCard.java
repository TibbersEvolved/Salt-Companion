package chilis.dev.SaltCompanion.models.FlashcardPlaySession;

public class FlashCard {
    private String topic;
    private String question;
    private String answer;

    public FlashCard(String topic, String question, String answer) {
        this.topic = topic;
        this.question = question;
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getTopic() {
        return question;
    }

    public void setTopic(String topic) {
        this.question = topic;
    }

    public String getName() {
        return topic;
    }

    public void setName(String name) {
        this.topic = name;
    }
}
