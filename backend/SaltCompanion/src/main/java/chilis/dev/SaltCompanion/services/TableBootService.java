package chilis.dev.SaltCompanion.services;

public class TableBootService {

    BootcampService bootcampService;

    public TableBootService(BootcampService bootcampService) {
        this.bootcampService = bootcampService;
    }

    public void addBootCamp(String name, String teacher) {
        bootcampService.addBootCamp(name, teacher);
    }
}
