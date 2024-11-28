import { SignedIn } from "@clerk/clerk-react";

export default function Footer() {
  return (
    <SignedIn>
      <footer className="footer bg-[#0f2d45] text-white items-center p-4">
        <aside className="grid-flow-col items-center ml-4">
          <img src="public/salt-logo-light.svg" alt="salt logo" />
          <p className="ml-4">
            © SALT {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>
      </footer>
    </SignedIn>
  );
}
