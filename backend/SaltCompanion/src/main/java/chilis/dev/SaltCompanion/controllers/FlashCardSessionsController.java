package chilis.dev.SaltCompanion.controllers;

import chilis.dev.SaltCompanion.controllers.dto.FlashCardDto;
import chilis.dev.SaltCompanion.controllers.dto.FlashCardSessionDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.CreateFlashSessionDto;
import chilis.dev.SaltCompanion.controllers.dtoInput.SessionsPostAnswerDto;
import chilis.dev.SaltCompanion.models.FlashcardPlaySession.FlashCard;
import chilis.dev.SaltCompanion.models.Student;
import chilis.dev.SaltCompanion.models.Topic;
import chilis.dev.SaltCompanion.services.BootcampService;
import chilis.dev.SaltCompanion.services.FlashCardService;
import chilis.dev.SaltCompanion.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/flashSession")
public class FlashCardSessionsController {

    private FlashCardService flashCardService;
    private BootcampService bootcampService;
    private StudentService studentService;

    public FlashCardSessionsController(FlashCardService flashCardService, BootcampService bootcampService, StudentService studentService) {
        this.flashCardService = flashCardService;
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
        UUID sessionId = flashCardService.startNewSession(mappedTopics,input.cards(),input.userId());
        return ResponseEntity.ok(new FlashCardSessionDto(sessionId.toString()));
    }

    @PostMapping("/answer")
    public ResponseEntity postAnswer(@RequestBody SessionsPostAnswerDto input) {
        flashCardService.answerFlashCardDifficulty(input.answer(),UUID.fromString(input.sessionId()));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashCardDto> drawCard(@PathVariable String id) {
        if (flashCardService.getCardsLeft(UUID.fromString(id)) <= 0) {
            return ResponseEntity.badRequest().build();
        }
        FlashCard flashCard = flashCardService.drawNewCard(UUID.fromString(id));
        int cardsLeft = flashCardService.getCardsLeft(UUID.fromString(id));
        return ResponseEntity.ok(new FlashCardDto(flashCard.getTopic(),
                flashCard.getQuestion(), flashCard.getAnswer(), cardsLeft));
    }
}
