package chilis.dev.SaltCompanion.models.FlashcardPlaySession;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class FlashcardSession {
    //These are not saved in DB!!! In memory
    private UUID id;
    private List<FlashCard> fleshDeck = new ArrayList<>();
}
