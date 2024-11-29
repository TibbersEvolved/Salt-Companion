package chilis.dev.SaltCompanion.exceptions;

public class ValidateClerkId {

    private static final String CLERK_ID_PREFIX = "user_";

    public boolean validateClerkId(String clerkId) {

        if (clerkId == null) {
            throw new ClerkIdException("ClerkId must exist");
        }

        if (!clerkId.startsWith(CLERK_ID_PREFIX)) {
            throw new ClerkIdException("ClerkId must start with 'user_'");
        }

        return true;

    }
}
