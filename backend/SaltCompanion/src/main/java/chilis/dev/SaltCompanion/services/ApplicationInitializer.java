package chilis.dev.SaltCompanion.services;

import chilis.dev.SaltCompanion.models.BootCamp;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ApplicationInitializer {

    private final TableBootService tableBootService;

    public ApplicationInitializer(TableBootService tableBootService, BootcampService bootcampService) {
        this.tableBootService = tableBootService;
    }

    @Transactional
    @PostConstruct
    public void initialize() {
        tableBootService.BootTables("JFS");
    }
}