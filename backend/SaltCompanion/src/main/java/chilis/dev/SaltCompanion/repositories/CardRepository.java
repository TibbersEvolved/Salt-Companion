package chilis.dev.SaltCompanion.repositories;

import chilis.dev.SaltCompanion.models.Card;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends ListCrudRepository<Card, Long> {
}
