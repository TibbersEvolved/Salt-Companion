package chilis.dev.SaltCompanion.exceptions;

public class ClerkIdException extends IllegalArgumentException{

    public ClerkIdException(){}

    public ClerkIdException(String message){
        super(message);
    }
}
