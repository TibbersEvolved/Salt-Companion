package chilis.dev.SaltCompanion.exceptions;

public class StudentExistException extends RuntimeException{

        public StudentExistException(){}

        public StudentExistException(String message){
            super(message);
        }
}
