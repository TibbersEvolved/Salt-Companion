import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Login from "../login/login-component";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <div className="grid grid-cols-2 min-h-screen">
        <div className="h-screen">
          <img
            src="public/salt.webp"
            alt="SALT logo"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src="public/salt-logo-dark.svg"
            alt="Salt logo"
            className="h-52 w-52"
          />
          <Login />
        </div>
      </div>
    </>
  );
}
