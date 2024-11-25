package chilis.dev.SaltCompanion.models;

import java.util.ArrayList;
import java.util.List;
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



}
