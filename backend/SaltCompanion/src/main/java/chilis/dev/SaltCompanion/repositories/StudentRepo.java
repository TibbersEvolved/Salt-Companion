package chilis.dev.SaltCompanion.repositories;

import chilis.dev.SaltCompanion.models.Student;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends ListCrudRepository<Student, Long> {

    public List<Student> findAllByClerkId(String clerkId);
}
