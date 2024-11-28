package chilis.dev.SaltCompanion.Exceptions;

public class TeacherExistException extends RuntimeException{

    public TeacherExistException() {}

    public TeacherExistException(String message) {
        super(message);
    }

}
