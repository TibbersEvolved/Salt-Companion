package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.Teacher;
import chilis.dev.SaltCompanion.repositories.TeacherRepository;

public class TeacherService {

    TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public void createTeacher(String clerkId, String name, String email) {
        if(teacherRepository.findByClerkId(clerkId)) {
            throw new IllegalArgumentException("Teacher with clerkId " + clerkId + " already exists");
        }
        teacherRepository.save(new Teacher(clerkId,name,email));
    }

    public Teacher findTeacherByClerkId(String clerkId) {
        return teacherRepository.findTeacherByClerkId(clerkId);
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
