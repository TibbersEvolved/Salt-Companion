import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { LandingPage } from "./landing-page";
import LoadingScreen from "../services/loadingScreen";


export default function LandingPageContainer() {
  const { user, isLoaded } = useUser();
  if (isLoaded === false) {
    return (<LoadingScreen displayText="Searching for user" />)
  }
  return (<LandingPage userId={user?.id as string} />)
}