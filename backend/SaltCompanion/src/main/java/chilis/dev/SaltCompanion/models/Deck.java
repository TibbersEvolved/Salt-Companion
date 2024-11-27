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
    private List<Card> deckCards = new ArrayList<>();

    @OneToOne(mappedBy = "deck")
    private Topic topic;


    public Deck() {

    }
    public Deck(Topic topic){
        this.topic = topic;
    }


    public void addCard(Card card) {
        deckCards.add(card);
        card.setDeck(this);
    }
    public boolean removeCard(Long cardId){
        for(Card c: deckCards){
            if(c.getId()==cardId) {
                c.setDeck(null);
                this.deckCards.remove(c);
                return true;
            }
        }
        return false;
    }

    public Card getRandomCard() {
        Random random = new Random();
        int card = random.nextInt(deckCards.size());
        return deckCards.get(card);
    }

    public List<Card> getDeckCards() {
        return deckCards;
    }

    public chilis.dev.SaltCompanion.models.Topic getTopic() {
        return topic;
    }

    public void setTopic(chilis.dev.SaltCompanion.models.Topic topic) {
        this.topic = topic;
    }

    public void setDeckCards(List<Card> deckCards) {
        this.deckCards = deckCards;
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
