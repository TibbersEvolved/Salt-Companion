package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TableBootService {

    BootcampService bootcampService;
    TeacherService teacherService;

    public TableBootService(BootcampService bootcampService, TeacherService teacherService) {
        this.bootcampService = bootcampService;
        this.teacherService = teacherService;
//        BootTables("JFS");
    }

    @Transactional
    public void BootTables(String bootCampName){

        Teacher teacher = teacherService.createTeacher("550e8400-e29b-41d4-a716-446655440000",
                "Alek","alek@salt.com");

        Long bootCampId = bootcampService.addBootCamp(bootCampName, teacher);

        bootcampService.addTopicToBootCamp(bootCampId, new Topic("React"));
        bootcampService.addTopicToBootCamp(bootCampId, new Topic("Typescript"));

        BootCamp bootCamp = bootcampService.getBootCamp(bootCampId);

        Topic topic = bootcampService.findBootCampTopic(bootCampId, "React");
        Topic ts = bootcampService.findBootCampTopic(bootCampId, "Typescript");
        Deck deck = topic.getDeck();
        loadDeck(deck);
        loadTypeScript(ts.getDeck());
        loadStudents(bootCamp);

        bootcampService.saveBootcamp(bootCamp);


    }
    @Transactional
    public void loadDeck(Deck deck){
        Card card1 = new Card("What is the most beautiful programming language?", "it is Cobol",deck);
        Card card2 = new Card("What is the most forbidden thing in programming", "to write to slow",deck);
        Card card3 = new Card("Is JPA a fun thing?", "Yes it is so much fun",deck);
        Card card4 = new Card("Why do you push ?", "version control",deck);
        Card card5 = new Card("Is Python cred or no?", "no",deck);

        deck.addCard(card1);
        deck.addCard(card2);
        deck.addCard(card3);
        deck.addCard(card4);
        deck.addCard(card5);
    }

    @Transactional
    public void loadTypeScript(Deck deck){
        Card card1 = new Card("What does === do, and how does it differ to ==", "It checks that the value AND type is the same. == only checks for value and will try converting other types to a matching value.",deck);
        Card card2 = new Card("What is TypeScript, and how does it differ from JavaScript", "TypeScript is a strongly typed superset of JavaScript developed by Microsoft. It builds on JavaScript by adding static types, enabling developers to catch errors during development rather than at runtime. Unlike JavaScript, TypeScript must be compiled into JavaScript before it can run in the browser or Node.js environment",deck);
        Card card3 = new Card("How does TypeScript handle optional properties in an object, and what is the syntax to define one??", "Optional properties are defined using the ? symbol. These properties are not required when creating an object of that type.",deck);
        Card card4 = new Card("Is it an error?", "No just typescript",deck);
        Card card5 = new Card("What is a type in Typescript?", "A type is a object that holds specific attributes",deck);
        deck.addCard(card1);
        deck.addCard(card2);
        deck.addCard(card3);
        deck.addCard(card4);
        deck.addCard(card5);
    }

    @Transactional
    public void loadStudents(BootCamp bootCamp){

        Student student1 = new Student("550e8400-e29b-41d4-a716-446655440001","John",bootCamp);
        Student student2 = new Student("550e8400-e29b-41d4-a716-446655440002","Sabine",bootCamp);
        Student student3 = new Student("550e8400-e29b-41d4-a716-446655440001","Erik",bootCamp);
        Student student4 = new Student("550e8400-e29b-41d4-a716-446655440002","Andreas",bootCamp);

        bootcampService.addStudent(bootCamp.getId(),student1);
        bootcampService.addStudent(bootCamp.getId(),student2);
        bootcampService.addStudent(bootCamp.getId(),student3);
        bootcampService.addStudent(bootCamp.getId(),student4);
    }







}
