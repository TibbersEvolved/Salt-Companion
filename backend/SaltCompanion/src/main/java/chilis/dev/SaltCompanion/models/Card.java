package chilis.dev.SaltCompanion.models;

import java.util.Objects;

public class Card {

    private int delete;
    private int id;

    private String text;

    private String answer;

    private CardDifficulty difficulty;

    public Card(){

    }
    public Card( String text, String answer){
        this.text = text;
        this.answer = answer;
        this.difficulty = CardDifficulty.IMPOSSIBLE;

    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public CardDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(CardDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Card card)) return false;
        return id == card.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", answer='" + answer + '\'' +
                ", difficulty=" + difficulty +
                '}';
    }
}