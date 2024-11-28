package chilis.dev.SaltCompanion.Exceptions;

public class BootCampIdException extends IllegalArgumentException {

    public BootCampIdException() {}

    public BootCampIdException(String message) {
        super(message);
    }
}