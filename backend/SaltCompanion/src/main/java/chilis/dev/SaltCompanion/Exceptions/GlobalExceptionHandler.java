package chilis.dev.SaltCompanion.Exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.context.support.DefaultMessageSourceResolvable;


import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({BootCampExistException.class})
    protected ResponseEntity handleBootCampExistException(
            BootCampExistException ex, WebRequest request) {

        String message = "Not found: " + ex.getMessage();
        return handleExceptionInternal(ex, message,
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
//
//    @ExceptionHandler({PresidentYearException.class})
//    protected ResponseEntity handlePresidentExistenceException(
//            PresidentYearException ex, WebRequest request) {
//
//        String message = "Invalid arguments: " + ex.getMessage();
//        return handleExceptionInternal(ex, message,
//                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @ExceptionHandler({IllegalArgumentException.class})
//    protected ResponseEntity handleIllegalArgument(IllegalArgumentException ex,
//                                                   WebRequest request) {
//
//        String message = "Invalid argument provided: " + ex.getMessage();
//        return handleExceptionInternal(ex, message,
//                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @ExceptionHandler({IllegalStateException.class})
//    protected ResponseEntity handleIllegalState(IllegalStateException ex,
//                                                WebRequest request) {
//
//        String message = "Illegal state: " + ex.getMessage();
//        return handleExceptionInternal(ex, message,
//                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @Override
//    protected ResponseEntity<Object> handleMethodArgumentNotValid(
//            MethodArgumentNotValidException ex, HttpHeaders headers,
//            HttpStatus status, WebRequest request) {
//
//        List<String> errors = ex.getBindingResult()
//                .getFieldErrors()
//                .stream()
//                .map(DefaultMessageSourceResolvable::getDefaultMessage)
//                .collect(Collectors.toList());
//        String errorMessage = String.join(",\n ", errors);
//
//        return handleExceptionInternal(ex, errorMessage,
//                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }
//
//    @ExceptionHandler({PresidencyOverlapException.class})
//    protected ResponseEntity handlePresidencyOverlapException(
//            PresidencyOverlapException ex, WebRequest request) {
//
//        String message = "Presidency overlap detected: " + ex.getMessage();
//        return handleExceptionInternal(ex, message,
//                new HttpHeaders(), HttpStatus.CONFLICT, request);
//    }
//
//    @ExceptionHandler({PresidentIdException.class})
//    protected ResponseEntity handlePresidentIdException(
//            PresidentIdException ex, WebRequest request) {
//
//        String message = "Invalid id: " + ex.getMessage();
//        return handleExceptionInternal(ex, message,
//                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
//    }


}