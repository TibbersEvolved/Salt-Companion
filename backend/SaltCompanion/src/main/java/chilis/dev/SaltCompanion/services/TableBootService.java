package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.*;

import java.util.ArrayList;
import java.util.List;

public class TableBootService {

    BootcampService bootcampService;
    TeacherService teacherService;

    private List<Student> mockStudents = new ArrayList<>();
    private List <Card> mockCards = new ArrayList<>();

    public TableBootService(BootcampService bootcampService, TeacherService teacherService) {
        this.bootcampService = bootcampService;
        this.teacherService = teacherService;
    }

    public void BootTables(String bootCampName){

        Teacher teacher = teacherService.createTeacher("550e8400-e29b-41d4-a716-446655440000",
                "Alek","alek@salt.com");

       Long bootCampId = bootcampService.addBootCamp(bootCampName, teacher);

       bootcampService.addTopicToBootCamp(bootCampId, new Topic("React"));

       BootCamp bootCamp = bootcampService.getBootCamp(bootCampId);

       Topic topic = bootcampService.findBootCampTopic(bootCampId, "React");
       Deck deck = topic.getDeck();
       loadDeck(deck);
       loadStudents(bootCamp);

       bootcampService.saveBootcamp(bootCamp);


    }

    public void loadDeck(Deck deck){
        Card card1 = new Card("What is the most beautiful programming language?", "it is Cobol",deck);
        Card card2 = new Card("What is the most forbidden thing in programming", "to write to slow",deck);
        Card card3 = new Card("Is JPA a fun thing?", "Yes it is so much fun",deck);
        Card card4 = new Card("Why do you push ?", "version control",deck);
        Card card5 = new Card("Is Python cred or no?", "no",deck);
    }

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
