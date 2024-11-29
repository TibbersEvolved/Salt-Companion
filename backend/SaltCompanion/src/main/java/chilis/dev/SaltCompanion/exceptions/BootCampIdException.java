package chilis.dev.SaltCompanion.exceptions;

public class BootCampIdException extends IllegalArgumentException {

    public BootCampIdException() {}

    public BootCampIdException(String message) {
        super(message);
    }
}