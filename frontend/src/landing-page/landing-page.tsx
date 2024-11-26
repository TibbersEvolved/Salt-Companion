import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";

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
    <div className="m-0 p-0 overflow-hidden">
      <SignedIn>
        <div className="m-0 p-0 bg-slate-600">
          <h2 className="text-center text-5xl">Welcome {user?.firstName}</h2>

          <div className="w-screen h-screen overflow-hidden text-5xl">
            {mockedCourseData.map((t) => (
              <button>{t.topic}</button>
            ))}
          </div>
        </div>
        <div className="w-screen h-screen overflow-hidden bg-gray-200">
          <h2 className="text-center text-5xl">Stats</h2>
        </div>
      </SignedIn>
    </div>
  );
};
