import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Login from "../login/login-component";
import saltIMg from "../../public/salt.webp"
import darklogo from "../../public/salt-logo-dark.svg";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <div className="grid grid-cols-2 min-h-screen">
        <div className="h-screen">
          <img
            src={saltIMg}
            alt="SALT logo"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src={darklogo}
            alt="Salt logo"
            className="h-52 w-52"
          />
          <Login />
        </div>
      </div>
    </>
  );
}
