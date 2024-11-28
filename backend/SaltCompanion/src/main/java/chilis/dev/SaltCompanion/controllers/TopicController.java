package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.FlashCardDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateCardDto;
import chilis.dev.SaltCompanion.services.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/topic")
public class TopicController {

    private CardService cardService;

    public TopicController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity createCard(@RequestBody CreateCardDto input) {
        cardService.addCard(input.topicId(), input.question(), input.answer());
        return ResponseEntity.status(201).build();
    }


}
