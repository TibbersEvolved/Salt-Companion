package chilis.dev.SaltCompanion.models.GptModels;



import java.util.ArrayList;
import java.util.List;

public class ChatRequest {

    private String model;
    private List<Message> messages;
    private double temperature;

   private final String DEFAULT_PROMPT = "Write me 10 new and unique flashcard with a question and answer. " +
           "Include information not covered before. The reply should be json array. Keep answer short. The subject is: ";

    public ChatRequest(String model, String prompt) {
        this.model = model;
        prompt = DEFAULT_PROMPT +prompt;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", prompt));
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