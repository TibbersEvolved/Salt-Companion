import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Teacher } from "../teacher-page/teacher-container";

export const Route = createFileRoute("/teacher")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Teacher />;
}
