package chilis.dev.SaltCompanion.models.GptModels;


import java.util.ArrayList;
import java.util.List;

public class ChatRequest {

    private String model;
    private List<Message> messages;
    private double temperature;
    private final int REQUEST_TYPE_1 = 1;
    private final int REQUEST_TYPE_2 = 2;
    private String prompt;

    private final String MANY_CARD_PROMPT = "Write me 10 new and unique flashcard with a question and answer. " +
            "Include information not covered before. The reply should be json array. Keep answer short. The subject is: ";

    private final String ONE_CARD_PROMPT = "Write me a new and unique JSON flashcard with a question and answer. " +
            "Include information not covered before. The reply should be json array of objects one card has quesion: and answer:. Keep answer short.";

    public ChatRequest(String model, String prompt, int requestType) {
        this.model = model;
        if (requestType == REQUEST_TYPE_2) {
            this.prompt = ONE_CARD_PROMPT + prompt;
        } else if (requestType == REQUEST_TYPE_1) {
            this.prompt = MANY_CARD_PROMPT + prompt;
        }

        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", this.prompt));
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }
}