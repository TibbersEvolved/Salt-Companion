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
  console.log("Publishable key = ", PUBLISHABLE_KEY);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          afterSignOutUrl="/"
          signInForceRedirectUrl="/role"
          signInFallbackRedirectUrl="/landing"
        >
          <Navbar />
          <div className="flex-grow bg-gray-100/50 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
          <Footer />
        </ClerkProvider>
      </div>
    </>
  );
}
