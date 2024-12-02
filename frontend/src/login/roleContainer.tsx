import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "../services/loadingScreen";
import SelectRole from "./selectRole";

export default function RoleContainer() {
    const { user, isLoaded } = useUser();
    if (isLoaded === false) {
        return (<LoadingScreen displayText="Searching for user" />)
    }
    return (<SelectRole clerkId={user?.id as string} />)
}