package chilis.dev.SaltCompanion.models;

import java.util.ArrayList;
import java.util.List;

public class BootCamp {

    int id;

    private String name;

    private List<Topic> topics;

    private Teacher teacher;

    private List<Student> students;



    public BootCamp(String name, Teacher teacher){
        this.name = name;
        this.topics = new ArrayList<>();
        this.students = new ArrayList<>();
    }


    public void addStudent(Student student){

        this.students.add(student);
    }

    public boolean removeStudent(Long studentId){
        for(Student s: students){
            if(s.getId().equals(studentId));
            this.students.remove(s);
            return true;
        }
        return false;
    }

    public void addTopic(Topic topic){

        topics.add(topic);
    }


    public long getNumberOfStudents(){
        return students.stream().count();
    }

    @Override
    public String toString() {
        return "BootCamp{" +
                "name='" + name + '\'' +
                ", topics=" + topics +
                ", teacher=" + teacher +
                ", students=" + students +
                '}';
    }
}
