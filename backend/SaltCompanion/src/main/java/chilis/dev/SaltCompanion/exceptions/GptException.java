package chilis.dev.SaltCompanion.exceptions;

public class GptException extends RuntimeException{


    public GptException(){}

    public GptException(String message){
        super(message);
    }
}
