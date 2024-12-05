import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <SignedIn>
      <div className="navbar bg-base-100">
        <div className="flex-1 ml-4">
          <Link draggable="false" to="/landing">
            <img
              draggable="false"
              src="public/salt-logo-dark.svg"
              alt="salt logo"
            />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 mx-4">
            <li>
              <details className="mx-4">
                <summary>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/teacher">
                      <a>Teacher Page</a>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <UserButton />
          </ul>
        </div>
      </div>
    </SignedIn>
  );
}
