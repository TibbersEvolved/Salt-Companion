package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.repositories.TeacherRepository;

public class TeacherService {

    TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public void createTeacher(String name) {
        teacherRepository.save(new Teacher(name));
    }

}
