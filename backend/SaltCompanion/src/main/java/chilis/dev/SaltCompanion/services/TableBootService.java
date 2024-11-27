package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.models.Topic;

public class TableBootService {

    BootcampService bootcampService;
    TeacherService teacherService;

    public TableBootService(BootcampService bootcampService, TeacherService teacherService) {
        this.bootcampService = bootcampService;
        this.teacherService = teacherService;
    }

    public void BootTables(String bootCampName){

        Teacher teacher = teacherService.createTeacher("550e8400-e29b-41d4-a716-446655440000",
                "Alek","alek@salt.com");

       Long bootCampId = bootcampService.addBootCamp(bootCampName, teacher);

       bootcampService.addTopicToBootCamp(bootCampId, new Topic("React"));

    }




}
