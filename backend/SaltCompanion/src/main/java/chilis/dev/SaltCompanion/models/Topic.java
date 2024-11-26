package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deck_id")
    private Deck deck;

    @ManyToOne()
    private BootCamp bootCamp;

    public BootCamp getBootCampList() {
        return bootCamp;
    }

    public Topic(String name) {
        this.name = name;
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

}
