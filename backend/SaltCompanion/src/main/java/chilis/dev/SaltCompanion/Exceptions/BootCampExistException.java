package chilis.dev.SaltCompanion.Exceptions;

public class BootCampExistException extends RuntimeException {

    public BootCampExistException() {}

    public BootCampExistException(String message) {
        super(message);
    }
}

