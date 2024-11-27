package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.FlashCardSessionDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateFlashSessionDto;
import chilis.dev.SaltCompanion.services.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private CardService cardService;


    @PostMapping
    public ResponseEntity<FlashCardSessionDto> createNewSession(@RequestBody CreateFlashSessionDto input) {
        return ResponseEntity.ok(new FlashCardSessionDto("hey"));
    }
}
