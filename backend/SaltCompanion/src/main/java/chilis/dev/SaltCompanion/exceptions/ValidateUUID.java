package chilis.dev.SaltCompanion.exceptions;

import org.springframework.stereotype.Component;

@Component
public class ValidateUUID {

    private static final int UUID_EXPECTED_LENGTH = 36;


    public boolean validateUUIDinput(String id) {

        if (id == null) {
            throw new UUIDException("Id must exist");
        }

        if (id.length() != UUID_EXPECTED_LENGTH) {
            throw new UUIDException("Use 2 hexadecimal characters with four hyphens: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX");
        }

        return true;

    }

}
