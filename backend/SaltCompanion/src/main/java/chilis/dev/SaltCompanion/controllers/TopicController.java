package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.CardDto;
import chilis.dev.SaltCompanion.controllers.dto.FlashCardDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateCardDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.UpdateCardDto;
import chilis.dev.SaltCompanion.models.Card;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.CardService;
import chilis.dev.SaltCompanion.services.ZpplicationInitializer;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/topic")
@CrossOrigin
public class TopicController {

    private CardService cardService;
    private ZpplicationInitializer initializer;

    public TopicController(CardService cardService, ZpplicationInitializer init) {
        this.cardService = cardService;
        this.initializer = init;
    }

    @PostMapping("/card")
    public ResponseEntity createCard(@RequestBody CreateCardDto input) {
        cardService.addCard(input.topicId(), input.question(), input.answer());
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/cards")
    @Operation(
            summary = "Add a list of cards for a topic",
            description = "requestbody with card id, question and answer")
    public ResponseEntity addMultipleCards(@RequestBody List<CreateCardDto> input) {
        for (CreateCardDto card : input) {
            cardService.addCard(card.topicId(), card.question(), card.answer());
        }
        return ResponseEntity.status(201).build();
    }

    @PutMapping("/cards")
    @Operation(
            summary = "Update a list of cards for a topic",
            description = "requestbody with list of cards with id, question and answer")
    public ResponseEntity updateMultipleCards(@RequestBody List<UpdateCardDto> input) {
        for (UpdateCardDto card : input) {
            cardService.updateCard(card.cardId(), card.question(), card.answer());
        }
        return ResponseEntity.status(202).build();
    }

    @PutMapping("/card")
    public ResponseEntity updateCard(@RequestBody UpdateCardDto input) {
        cardService.updateCard(input.cardId(), input.question(), input.answer());
        return ResponseEntity.status(202).build();
    }

    @DeleteMapping("card/{cardId}")
    public ResponseEntity deleteCard(@PathVariable Long cardId) {
        cardService.deleteCard(cardId);
        return ResponseEntity.status(200).build();
    }


    @GetMapping("/card/{topicId}")
    @Operation(
            summary = "Gets all cards for a topic",
            description = "response body with card id, question and answer")
    public List<CardDto> getCards(@PathVariable Long topicId) {
        List<Card> cards = cardService.getTopic(topicId).getDeck().getDeckCards();
        return cards.stream()
                .map(card -> new CardDto(card.getText(), card.getAnswer(), card.getId()))
                .toList();
    }

    @GetMapping("/init")
    public ResponseEntity initDB() {
        initializer.initialize();
        return ResponseEntity.ok().build();
    }


}
