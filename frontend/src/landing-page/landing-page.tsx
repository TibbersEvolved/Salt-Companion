import { SignedIn } from "@clerk/clerk-react";

export const LandingPage = () => {
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
    <>
      <SignedIn>
        <div>
          {mockedCourseData.map((t) => (
            <button>{t.topic}</button>
          ))}
        </div>
      </SignedIn>
    </>
  );
};
