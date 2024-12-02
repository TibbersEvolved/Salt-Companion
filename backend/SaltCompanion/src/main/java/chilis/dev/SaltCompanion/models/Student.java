package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;
import org.hibernate.annotations.ManyToAny;

import java.util.Objects;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clerkId;

    private String email;

    private Integer streakRecord;

    private Integer currentStreak ;
    private Integer totalCardsFlipped ;
    private Float quizScore ;
    private Integer lastDayPlayed ;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "bootcamp_id")
    private BootCamp bootCamp;

    public Student() {

    }

    public Student(String clerkId, String name, BootCamp bootCamp) {
        this.clerkId = clerkId;
        this.name = name;
        this.bootCamp = bootCamp;
    }

    public Student(String email) {

        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getMail() {
        return email;
    }

    public BootCamp getBootCamp() {
        return bootCamp;
    }

    public void setBootCamp(BootCamp bootCamp) {
        this.bootCamp = bootCamp;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student student)) return false;
        return Objects.equals(id, student.id) && Objects.equals(email, student.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    public String getClerkId() {
        return clerkId;
    }

    public void setClerkId(String clerkId) {
        this.clerkId = clerkId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStreakRecord() {
        if(streakRecord == null) {
            streakRecord = 0;
        }
        return streakRecord;
    }

    public void setStreakRecord(int streakRecord) {
        this.streakRecord = streakRecord;
    }

    public Integer getCurrentStreak() {
        if(currentStreak == null) {
            currentStreak = 0;
        }
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
        if(this.currentStreak > streakRecord) {
            streakRecord = this.currentStreak;
        }
    }

    public Integer getTotalCardsFlipped() {
        if(totalCardsFlipped== null) {
            totalCardsFlipped = 0;
        }
        return totalCardsFlipped;
    }

    public void setTotalCardsFlipped(int totalCardsFlipped) {
        this.totalCardsFlipped = totalCardsFlipped;
    }

    public Float getQuizScore() {
        if(quizScore == null) {
            quizScore = 0f;
        }
        return quizScore;
    }

    public void updateLastDay(int day) {
        if(day == lastDayPlayed){
            return;
        }
        if(day == lastDayPlayed+1) {
            setCurrentStreak(currentStreak+1);
            lastDayPlayed = day;
            return;
        }
        if(day == 1 && lastDayPlayed == 365) {
            setCurrentStreak(currentStreak+1);
            lastDayPlayed = day;
            return;
        }
        setCurrentStreak(1);
        lastDayPlayed = day;
    }

    public void setQuizScore(float quizScore) {
        this.quizScore = quizScore;
    }
}
