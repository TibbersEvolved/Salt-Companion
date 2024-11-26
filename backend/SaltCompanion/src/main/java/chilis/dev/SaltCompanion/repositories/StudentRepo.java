package chilis.dev.SaltCompanion.repositories;

import chilis.dev.SaltCompanion.models.Student;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends ListCrudRepository<Student, Long> {
}
