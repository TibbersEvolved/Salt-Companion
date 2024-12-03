import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import RoleContainer from "./roleContainer";

export default function Login() {
  return (
    <header>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <RoleContainer />
      </SignedIn>
    </header>
  );
}
