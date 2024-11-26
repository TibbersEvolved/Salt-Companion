import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

export const Route = createRootRoute({
  component: RootComponent,
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function RootComponent() {
  return (
    <>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        signInFallbackRedirectUrl="/landing"
      >
        <Navbar />

        <Outlet />
        <Footer />
      </ClerkProvider>
    </>
  );
}
