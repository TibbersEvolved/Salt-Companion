package chilis.dev.SaltCompanion.Exceptions;

public class UUIDException extends IllegalArgumentException{

    public UUIDException() {}

    public UUIDException(String message) {
        super(message);
    }

}
