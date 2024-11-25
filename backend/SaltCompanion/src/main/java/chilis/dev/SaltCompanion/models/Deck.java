package chilis.dev.SaltCompanion.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

public class Deck {

    private long id;
    private List<Card> deckCards = new ArrayList<>();

    public Deck() {
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
