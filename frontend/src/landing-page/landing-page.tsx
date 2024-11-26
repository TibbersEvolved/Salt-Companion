import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export const LandingPage = () => {
  const { user } = useUser();
  const mockedCourseData = [
    {
      id: "1",
      topic: "Java & OOP",
    },
    {
      id: "2",
      topic: "Spring and Advanced Java",
    },
    {
      id: "3",
      topic: "HTML and CSS",
    },
    {
      id: "4",
      topic: "Web APIs & Spring MVC",
    },
    {
      id: "5",
      topic: "JavaScript, TypeScript",
    },
    {
      id: "6",
      topic: "React",
    },
    {
      id: "7",
      topic: "Databases & Spring JPA",
    },
    {
      id: "8",
      topic: "Security and Automation",
    },
    {
      id: "9",
      topic: "Cloud",
    },
  ];

  return (
    <div className="m-0 p-0 overflow-hidden content-center">
      <SignedIn>
        <div className="m-0 p-0 bg-slate-600 w-screen h-screen items-center">
          <h2 className="text-center text-5xl">Welcome {user?.firstName}</h2>

          <div className=" grid grid-cols-2 gap-4 ">
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
