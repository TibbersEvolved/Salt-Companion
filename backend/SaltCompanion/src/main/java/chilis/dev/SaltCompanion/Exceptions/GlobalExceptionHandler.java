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

}