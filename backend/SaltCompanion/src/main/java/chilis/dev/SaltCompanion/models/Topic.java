package chilis.dev.SaltCompanion.models;

public class Topic {

    private Long id;

    private String name;

    private Deck deck = null;

    public Topic(String name){

        this.name = name;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public Long getId() {
        return id;
    }
}
