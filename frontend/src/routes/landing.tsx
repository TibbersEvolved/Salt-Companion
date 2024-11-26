import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../landing-page/landing-page";

export const Route = createFileRoute("/landing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}
