package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
public class BootCamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "topic_id")
    private List<Topic> topics;


    private Teacher teacher;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id")
    private List<Student> students;



    public BootCamp(String name, Teacher teacher){
        this.name = name;
        this.topics = new ArrayList<>();
        this.students = new ArrayList<>();
    }

    public BootCamp(){

    }


    public void addStudent(Student student){

        this.students.add(student);
    }

    public boolean removeStudent(Long studentId){
        for(Student s: students){
            if(s.getId()==studentId);
            this.students.remove(s);
            return true;
        }
        return false;
    }

    public void addTopic(Topic topic){

        topics.add(topic);
    }

    public boolean removeTopic(Long topicId){

        for(Topic t : topics){

            if(t.getId()==topicId){
                topics.remove(t);
                return true;
            }
        }
        return false;

    }


    public long getNumberOfStudents(){
        return students.stream().count();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public List<Student> getStudents() {
        return students;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BootCamp bootCamp)) return false;
        return id == bootCamp.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
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
