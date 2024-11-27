package chilis.dev.SaltCompanion.models.FlashcardPlaySession;

public class FlashCard {
    private String name;
    private String topic;
    private String answer;

    public FlashCard(String name, String topic, String answer) {
        this.name = name;
        this.topic = topic;
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
