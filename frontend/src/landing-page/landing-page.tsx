import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { mockedCourseData } from "../mocked/mocked-data";

export const LandingPage = () => {
  const { user } = useUser();

  return (
    <div className="m-0 p-0 overflow-hidden place-content-center">
      <SignedIn>
        <div className="m-0 p-0 bg-slate-600 w-screen h-screen items-center">
          <h2 className="text-center text-5xl">Welcome {user?.firstName}</h2>

          <div className="grid grid-cols-2 gap-4 place-content-center ">
            {mockedCourseData.map((t) => (
              <Link to="/flashcard">
                <button>{t.topic}</button>
              </Link>
            ))}
          </div>
          <button className="text-5xl border-solid rounded-lg border-2 border-black w-fit">
            Next
          </button>
        </div>
        <div className="w-screen h-screen overflow-hidden bg-gray-200">
          <h2 className="text-center text-5xl">Stats</h2>
        </div>
      </SignedIn>
    </div>
  );
};
