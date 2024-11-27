package chilis.dev.SaltCompanion.models.FlashcardPlaySession;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class FlashcardSession {
    //These are not saved in DB!!! In memory
    private UUID id;
    private List<FlashCard> flashDeck = new ArrayList<>();
    private int index ;

    public FlashcardSession(List<FlashCard> flashDeck) {
        this.flashDeck = flashDeck;
        id = UUID.randomUUID();
        index = -1;
    }

    public FlashCard drawNext() {
        index += 1;
        return flashDeck.get(index);
    }

    public UUID getId() {
        return id;
    }

    public List<FlashCard> getFlashDeck() {
        return flashDeck;
    }

    public int getIndex() {
        return index;
    }
}