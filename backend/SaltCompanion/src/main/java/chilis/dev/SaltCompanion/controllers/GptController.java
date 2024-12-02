package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.exceptions.GptException;
import chilis.dev.SaltCompanion.models.GptModels.ChatRequest;
import chilis.dev.SaltCompanion.models.GptModels.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController("/api")
public class GptController {

    @Qualifier("openaiRestTemplate")
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;


    public GptController(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    @GetMapping("/gpt")
    public ResponseEntity chat(@RequestParam String prompt) {

        ChatRequest request = new ChatRequest(model, prompt);

        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

//        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
//            return ResponseEntity.status(400).body("Could not genererate ChatGpt flashcard");
//        }
        validateResponse(response);

        return ResponseEntity.status(200).body(response.getChoices().get(0).getMessage().getContent());
    }

    public boolean validateResponse(ChatResponse response){
        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            throw new GptException();
        }
        return true;

    }


}
