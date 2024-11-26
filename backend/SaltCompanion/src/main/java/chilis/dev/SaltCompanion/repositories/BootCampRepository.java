package chilis.dev.SaltCompanion.repositories;

import chilis.dev.SaltCompanion.models.BootCamp;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BootCampRepository extends ListCrudRepository<BootCamp, Long> {
}
