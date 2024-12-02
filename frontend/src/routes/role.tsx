import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import SelectRole from "../login/selectRole";

export const Route = createFileRoute("/role")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SelectRole />;
}
``;
