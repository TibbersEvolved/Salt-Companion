package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.FlashCardDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateCardDto;
import chilis.dev.SaltCompanion.services.CardService;
import chilis.dev.SaltCompanion.services.ZpplicationInitializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/topic")
public class TopicController {

    private CardService cardService;
    private ZpplicationInitializer initializer;

    public TopicController(CardService cardService, ZpplicationInitializer init) {
        this.cardService = cardService;
        this.initializer = init;
    }

    @PostMapping
    public ResponseEntity createCard(@RequestBody CreateCardDto input) {
        cardService.addCard(input.topicId(), input.question(), input.answer());
        return ResponseEntity.status(201).build();
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity deleteCard(@PathVariable Long cardId) {
        cardService.deleteCard(cardId);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/init")
    public ResponseEntity initDB () {
        initializer.initialize();
        return ResponseEntity.ok().build();
    }


}
