package chilis.dev.SaltCompanion.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deck_id")
    private Deck deck;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<BootCamp> bootCampList;

    public List<BootCamp> getBootCampList() {
        return bootCampList;
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

    public Long getId() {
        return id;
    }

    public void addBootCamp(BootCamp bootCamp) {
        bootCampList.add(bootCamp);
    }

    public boolean removeBootCamp(Long bootCampId) {
        for (BootCamp b : bootCampList) {
            if (b.getId() == bootCampId) {
                bootCampList.remove(b);
                return true;
            }

        }
        return false;
    }
}
