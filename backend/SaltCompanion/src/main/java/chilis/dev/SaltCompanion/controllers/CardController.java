package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.FlashCardDto;
import chilis.dev.SaltCompanion.controllers.dto.FlashCardSessionDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateFlashSessionDto;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashCard;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.CardService;
import chilis.dev.SaltCompanion.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private CardService cardService;
    private BootcampService bootcampService;
    private StudentService studentService;

    public CardController(CardService cardService, BootcampService bootcampService, StudentService studentService) {
        this.cardService = cardService;
        this.bootcampService = bootcampService;
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<FlashCardSessionDto> createNewSession(@RequestBody CreateFlashSessionDto input) {
        Student student = studentService.findStudentByClerkId(input.userId());
        List<Topic> userTopics = bootcampService.getTopicsForBootCamp(student.getBootCamp().getId());
        List<Topic> mappedTopics = new ArrayList<>();
        for(int i = 0; i < userTopics.size(); i++) {
            for(int j = 0; j < input.topicIdList().size(); j++) {
                if(userTopics.get(i).getId() == input.topicIdList().get(j)) {
                    mappedTopics.add(userTopics.get(i));
                }
            }
        }
        UUID sessionId = cardService.startNewSession(mappedTopics,input.cards());
        return ResponseEntity.ok(new FlashCardSessionDto(sessionId.toString()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashCardDto> drawCard(@PathVariable String id) {
        FlashCard flashCard = cardService.drawNewCard(UUID.fromString(id));
        int cardsLeft = cardService.getCardsLeft(UUID.fromString(id));
        return ResponseEntity.ok(new FlashCardDto(flashCard.getTopic(),
                flashCard.getQuestion(), flashCard.getAnswer(), cardsLeft));
    }
}
