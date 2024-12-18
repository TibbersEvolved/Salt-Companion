package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clerkId;

    @Column(nullable = false)
    private String name;

    private String email;

    @OneToMany(mappedBy = "teacher")
    private List<BootCamp> bootCampList = new ArrayList<>();

    public Teacher() {
    }

    public Teacher(String clerkId, String name, String email) {
        this.name = name;
        this.email = email;
        this.clerkId = clerkId;
    }

    public void addBootCamp(BootCamp bootCamp) {
        bootCampList.add(bootCamp);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public List<BootCamp> getBootCampList() {
        return bootCampList;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Teacher teacher)) return false;
        return Objects.equals(id, teacher.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", bootCampList=" + bootCampList +
                '}';
    }

}
