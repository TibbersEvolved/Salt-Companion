package chilis.dev.SaltCompanion.models.FlashcardPlaySession;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class FlashcardSession {
    //These are not saved in DB!!! In memory
    private UUID id;
    private List<FlashCard> flashDeck = new ArrayList<>();
    private int index ;
    private String clerkId;

    public FlashcardSession(List<FlashCard> flashDeck, String clerkId) {
        this.flashDeck = flashDeck;
        id = UUID.randomUUID();
        index = -1;
        this.clerkId = clerkId;
    }

    public FlashCard drawNext() {
        index += 1;
        return getCurrentCard();
    }

    public FlashCard getCurrentCard() {
        if(flashDeck.size() <= index) {
            return flashDeck.get(flashDeck.size() -1);
        }
        return flashDeck.get(index);
    }

    public UUID getId() {
        return id;
    }

    public int getCardsLeft() {
        return flashDeck.size() - 1 - index;
    }

    public List<FlashCard> getFlashDeck() {
        return flashDeck;
    }

    public int getIndex() {
        return index;
    }

    public String getClerkId() {
        return clerkId;
    }
}
