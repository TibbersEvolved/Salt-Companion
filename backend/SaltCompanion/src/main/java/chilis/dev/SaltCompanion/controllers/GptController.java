package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.exceptions.GptException;
import chilis.dev.SaltCompanion.models.GptModels.ChatRequest;
import chilis.dev.SaltCompanion.models.GptModels.ChatResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@RestController("/api")
@Tag(name = "GPT API", description = "API to interact with ChatGPT for generating responses")
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
    @Operation(
            summary = "Get ChatGPT flash cards",
            description = "request should be ?prompt=Topic")
    public ResponseEntity chat(@RequestParam String prompt) {

        ChatRequest request = new ChatRequest(model, prompt,1);

        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);

        validateResponse(response);

        return ResponseEntity.status(200).body(response.getChoices().get(0).getMessage().getContent());
    }

    @GetMapping("/gpt/flashcard")
    @Operation(
            summary = "Get ONE ChatGPT flash card",
            description = "request should include ?prompt=TopicName")
    public ResponseEntity getOneChatResponse(@RequestBody String prompt, @RequestParam String topicName) {

        prompt = "Topic name is " + topicName + " do not include any of these questions in your card response";

        ChatRequest request = new ChatRequest(model, prompt,2);
        ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);
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
