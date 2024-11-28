import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { mockedCourseData } from "../mocked/mocked-data";
import Select from "react-select";
import { useState } from "react";

export const LandingPage = () => {
  const { user } = useUser();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleClick = () => {
    <Link to="/flashcard" />;
    console.log(selectedOptions);
  };

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl p-6 grid grid-cols-1 gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome, {user?.firstName}!
            </h2>
            <p className="text-gray-600">User ID: {user?.id}</p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Not sure what to study?
            </h3>
            <p className="text-gray-600 mb-4">
              Take our quiz to find your focus!
            </p>
            <button
              onClick={handleClick}
              className="m-6 bg-gray-300 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-500 transition duration-200"
            >
              <Link to="/quiz">Quiz</Link>
            </button>
            <div className="h-20 w-54 border border-black  mx-auto">
              Stuff to practice{" "}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Select
              isMulti
              options={mockedCourseData}
              className="text-black w-full max-w-md"
              classNamePrefix="select"
              onChange={handleChange}
              placeholder="Select topics to practice"
            />
            <button
              onClick={handleClick}
              className="mt-6 bg-gray-300 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-500 transition duration-200"
            >
              <Link to="/flashcard">Next</Link>
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl mt-8 p-6">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
            Stats
          </h2>
          <div className="border border-gray-300 rounded-lg p-4">
            <h2 className="text-lg text-gray-700">
              Here are some school stats:
            </h2>
          </div>
        </div>
      </div>
    </SignedIn>
  );
};
