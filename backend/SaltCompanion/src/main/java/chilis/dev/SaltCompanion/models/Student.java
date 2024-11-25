package chilis.dev.SaltCompanion.models;

import java.util.Objects;

public class Student {

    private Long id;

    private String email;

    private String name;

    public Student() {

    }

    public Student(String mail) {

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
