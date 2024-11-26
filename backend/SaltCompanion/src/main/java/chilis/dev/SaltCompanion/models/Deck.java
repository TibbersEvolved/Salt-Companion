package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Entity
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    private List<Card> deckCards;

    public Deck() {
        this.deckCards = new ArrayList<>();

    }

    public void addCard(Card card) {
        deckCards.add(card);
    }

    public Card getRandomCard() {
        Random random = new Random();
        int card = random.nextInt(deckCards.size());
        return deckCards.get(card);
    }

    public List<Card> getDeckCards() {
        return deckCards;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Deck deck)) return false;
        return id == deck.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Deck{" +
                "id=" + id +
                ", deckCards=" + deckCards +
                '}';
    }
}
