import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { mockedCourseData } from "../mocked/mocked-data";
import Select from "react-select";
import { useState } from "react";
import { Flashcard } from "../flashcard/flashcard-container";
import {
  fetchBootcamps,
  getQuizQuestions,
  startFlashcardSession,
} from "../services/api";

export const LandingPage = () => {
  const { user } = useUser();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [sessionId, setSessionId] = useState("");

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleClick = async () => {
    const response = await startFlashcardSession(
      10,
      [1, 2],
      user?.id as string
    );
    setSessionId(response.id);
    setPage(2);
    console.log(selectedOptions);
  };

  if (page === 2) {
    return <Flashcard sessionId={sessionId} />;
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl p-6 grid grid-cols-1 gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">
              Welcome, {user?.firstName}!
            </h2>
            <p className="text-[#424242]">User ID: {user?.id}</p>
            <button></button>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">
              Not sure what to study?
            </h3>
            <p className="text-[#424242]">Take our quiz to find your focus!</p>
            <button
              onClick={handleClick}
              className="m-6 bg-[#fc7961] text-white h-10 w-24 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
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
              className="text-[#424242] w-full max-w-md font-light"
              classNamePrefix="select"
              onChange={handleChange}
              placeholder="Select topics to practice"
            />
            <button
              onClick={handleClick}
              className="mt-6 bg-[#fc7961] text-white h-10 w-24 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl mt-8 p-6">
          <h2 className="text-center text-3xl font-bold mb-4">Stats</h2>
          <div className="border border-gray-300 rounded-lg p-4">
            <p className="text-[#424242] text-lg">
              Here are some school stats:
            </p>
          </div>
        </div>
      </div>
    </SignedIn>
  );
};
