import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Quiz } from "../quiz/quiz-container";

export const Route = createFileRoute("/quiz")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Quiz />;
}
