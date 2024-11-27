package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.*;

@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    //    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "deck_id")
//    private Deck deck;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deck")
    private Deck deck;

    @ManyToOne
    @JoinColumn(name = "bootcamp_id", nullable = false)
    private BootCamp bootCamp;

    public BootCamp getBootCampList() {
        return bootCamp;
    }

    public Topic(String name) {
        this.name = name;
        this.deck = new Deck();
        this.deck.setTopic(this);
    }

    public Topic() {

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

    public void setBootCamp(BootCamp bootCamp) {
        this.bootCamp = bootCamp;
    }

    public Long getId() {
        return id;
    }


    public void addBootCamp(BootCamp bootCamp) {
        this.bootCamp = bootCamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Topic topic)) return false;
        return Objects.equals(name, topic.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }
}
