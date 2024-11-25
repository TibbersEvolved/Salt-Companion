package chilis.dev.SaltCompanion.models;

import java.util.Objects;

public class User {

    private Long id;

    private String email;

    private String name;

    public User() {

    }

    public User(String mail) {

    }

    public String getEmail() {
        return email;
    }

    public String getMail() {
        return email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(id, user.id) && Objects.equals(email, user.email);
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
