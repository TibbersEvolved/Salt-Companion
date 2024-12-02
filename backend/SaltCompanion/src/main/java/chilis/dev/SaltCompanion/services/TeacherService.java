package chilis.dev.SaltCompanion.services;

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

        if(teacher!=null) {
            throw new IllegalArgumentException("Teacher with clerkId " + clerkId + " already exists");
        }
        Teacher newTeacher = new Teacher(clerkId, name, email);
        return teacherRepository.save(newTeacher);
    }

    public Teacher findTeacherByClerkId(String clerkId) {
        return teacherRepository.findTeacherByClerkId(clerkId);
    }

    public boolean isUserTeacher(String clerkId) {
        Teacher teacher = teacherRepository.findTeacherByClerkId(clerkId);
        return (teacher == null);
    }
    public boolean deleteTeacher(String clerkId){
        Teacher teacher = teacherRepository.findTeacherByClerkId(clerkId);
        if(teacher == null) {
            throw new NullPointerException("Teacher: " + clerkId + " does not exist. Cannot delete");
        }
        teacherRepository.delete(teacher);
        return true;
    }




}
