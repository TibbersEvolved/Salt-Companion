import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import SelectRole from "../login/selectRole";
import RoleContainer from "../login/roleContainer";

export const Route = createFileRoute("/role")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RoleContainer />
}
``;
