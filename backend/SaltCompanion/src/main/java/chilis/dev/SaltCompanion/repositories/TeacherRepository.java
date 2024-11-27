package chilis.dev.SaltCompanion.repositories;

import chilis.dev.SaltCompanion.models.Teacher;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends ListCrudRepository<Teacher, Long> {
    boolean findByClerkId(String clerkId);

    Teacher findTeacherByClerkId(String clerkId);
}
