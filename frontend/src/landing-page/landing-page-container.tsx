import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { LandingPage } from "./landing-page";


export default function LandingPageContainer() {
  const { user, isLoaded } = useUser();
  if (isLoaded === false) {
    return (<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      Fetching User Data</div>)
  }
  return (<LandingPage userId={user?.id as string} />)
}