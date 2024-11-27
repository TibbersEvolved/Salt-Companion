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

    @Column(nullable = false)
    private String name;

    @ManyToOne()
    @JoinColumn(name = "bootcamp_id")
    private BootCamp bootCamp;

    public Student() {

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
}
