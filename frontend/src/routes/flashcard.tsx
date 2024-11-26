import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flashcard } from "../flashcard/flashcard-container";

export const Route = createFileRoute("/flashcard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Flashcard />;
}
