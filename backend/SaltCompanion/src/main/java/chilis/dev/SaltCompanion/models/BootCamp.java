package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.*;


@Entity
public class BootCamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "bootCamp", cascade = CascadeType.ALL)
    private List<Topic> topics = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @OneToMany(mappedBy = "bootCamp", cascade = CascadeType.ALL)
    private List<Student> students = new ArrayList<>();



    public BootCamp(String name, Teacher teacher){
        this.name = name;
        this.teacher = teacher;

    }

    public BootCamp() {

    }

    public void addStudent(Student student){
        this.students.add(student);
        student.setBootCamp(this);
    }

    public boolean removeStudent(String clerkId){
        for(Student s: students){
            if(s.getClerkId().equals(clerkId)) {
                s.setBootCamp(null);
                this.students.remove(s);

                return true;
            }
        }
        return false;
    }

    public boolean findStudent(String clerkId){
        for(Student s: students){
            if(s.getClerkId().equals(clerkId)) {
                return true;
            }
        }
        return false;
    }

    @Transactional
    public void addTopic(Topic topic) {
        topic.addBootCamp(this);
        topics.add(topic);
    }

    public boolean removeTopic(Long topicId){

        for(Topic t : topics){
            if(t.getId()==topicId){
               t.setBootCamp(null);
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

    public void setTeacher(Teacher teacher){
        this.teacher = teacher;
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

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
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
