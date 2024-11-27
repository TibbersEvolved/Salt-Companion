import { SignedIn } from "@clerk/clerk-react";
import { mockedQuiz } from "../mocked/mocked-data";

export const Quiz = () => {
  return (
    <SignedIn>
      <div className="m-0 p-0 bg-white w-screen h-screen flex justify-center items-center">
        {mockedQuiz.map((q) => (
          <div className="border border-black bg-slate-200 h-3/4 w-3/4 flex justify-evenly flex-col items-center round shadow-lg">
            <h4 className="text-3xl text-black">{q.question}</h4>
            <div className="flex flex-col w-full items-center">
              <button className="m-2 p-4 w-10/12 min-h-7 shadow-md bg-gray-400 text-black border border-black hover:bg-gray-500 transition duration-200">
                {q.answer1}
              </button>
              <button className="m-2 p-4 w-10/12 min-h-7 shadow-md bg-gray-400 text-black border border-black hover:bg-gray-500 transition duration-200">
                {q.answer2}
              </button>
              <button className="m-2 p-4 w-10/12 min-h-7 shadow-md bg-gray-400 text-black border border-black hover:bg-gray-500 transition duration-200">
                {q.answer3}
              </button>
              <button className="m-2 p-4 w-10/12 min-h-7 shadow-md bg-gray-400 text-black border border-black hover:bg-gray-500 transition duration-200">
                {q.answer4}
              </button>
            </div>
            <button className="m-2 p-4 w-4/12 border text-black border-black">
              Next
            </button>
          </div>
        ))}
      </div>
    </SignedIn>
  );
};
