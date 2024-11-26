package chilis.dev.SaltCompanion.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bootcamps")
public class BootcampController {


    @GetMapping("/topic/{id}")
    public void getCoursesFromBootcamp(@PathVariable int id) {
        List<Long> topicIds = new ArrayList<>();
        //Get bootcamp, get all topics by id, send out to client
    }

    @GetMapping("/teacher/{id}")
    public void getTeacherFromBootCamp(@PathVariable int id) {
        //return teacher name
    }

    @GetMapping()
    public void getAllBootCamps() {

    }
}
