package chilis.dev.SaltCompanion.Exceptions;

public class BootCampExistException extends RuntimeException {

    private BootCampExistException() {}

    public BootCampExistException(String message) {
        super(message);
    }
}

