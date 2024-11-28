package chilis.dev.SaltCompanion.services;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ZpplicationInitializer {

    private final TableBootService tableBootService;

    public ZpplicationInitializer(TableBootService tableBootService, BootcampService bootcampService) {
        this.tableBootService = tableBootService;
    }

    @Transactional
//    @PostConstruct
//    @DependsOn("SaltCompanionApplication")
    public void initialize() {
        tableBootService.BootTables("JFS");
    }
}