package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.Exceptions.TeacherExistException;
import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

    TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher createTeacher(String clerkId, String name, String email) {
        Teacher teacher = teacherRepository.findTeacherByClerkId(clerkId);

        if (validateTeacherExist(teacher)) {
            throw new IllegalArgumentException("Teacher with clerkId " + clerkId + " already exists");
        }
        return new Teacher(clerkId, name, email);
    }

    public Teacher findTeacherByClerkId(String clerkId) {
        Teacher teacher = teacherRepository.findTeacherByClerkId(clerkId);
        validateTeacherExist(teacher);
        return teacher;
    }

    public boolean deleteTeacher(String clerkId) {
        Teacher teacher = teacherRepository.findTeacherByClerkId(clerkId);
        validateTeacherExist(teacher);

        teacherRepository.delete(teacher);
        return true;
    }

    public boolean validateTeacherExist(Teacher teacher) {

        if (teacher == null) {
            throw new TeacherExistException();
        }
        return true;
    }


}
