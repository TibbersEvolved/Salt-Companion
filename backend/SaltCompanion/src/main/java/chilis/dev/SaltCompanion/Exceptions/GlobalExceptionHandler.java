package chilis.dev.SaltCompanion.Exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.context.support.DefaultMessageSourceResolvable;


import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({BootCampExistException.class})
    protected ResponseEntity handleBootCampExistException(
            BootCampExistException ex, WebRequest request) {

        String message = "Bootcamp not found: " + ex.getMessage();
        return handleExceptionInternal(ex, message,
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler({BootCampIdException.class})
    protected ResponseEntity handleBootCampIdException(
            BootCampIdException ex, WebRequest request) {

        String message = "Bootcamp id invalid " + ex.getMessage();
        return handleExceptionInternal(ex, message,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    //Really cool. Catches input missmatches on controller / Andreas
    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    protected ResponseEntity handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException ex, WebRequest request) {

        String message = "Not valid input format " + ex.getMessage();
        return handleExceptionInternal(ex, message,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({TeacherExistException.class})
    protected ResponseEntity handleTeacherExist(
            TeacherExistException ex, WebRequest request) {

        String message = "Teacher not found " + ex.getMessage();
        return handleExceptionInternal(ex, message,
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

}