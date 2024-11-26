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
          <h1 className="text-4xl p-2 text-center mb-10">
            Welcome to the ultimate SALT Companion
          </h1>
          <Login />
        </div>
      </div>
    </>
  );
}
