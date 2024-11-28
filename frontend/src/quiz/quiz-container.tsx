import { SignedIn } from "@clerk/clerk-react";
import { mockedQuiz } from "../mocked/mocked-data";

export const Quiz = () => {
  return (
    <>
      <SignedIn>
        <div className="m-0 p-0 w-screen h-screen flex justify-center items-center">
          {mockedQuiz.map((q) => (
            <div className=" bg-white rounded-2xl h-3/4 w-3/4 flex justify-evenly flex-col items-center round shadow-lg">
              <h2 className="text-4xl">{q.question}</h2>
              <div className="flex flex-col w-full items-start text-2xl space-y-4">
                <div className="flex items-center space-x-4 mx-32">
                  <input
                    type="radio"
                    name="answer"
                    id="answer-1"
                    className="appearance-none w-5 h-5 border-2 border-gray-500/50 rounded-full"
                  />
                  <label htmlFor="answer-1">{q.answer1}</label>
                </div>
                <div className="flex items-center space-x-4 mx-32">
                  <input
                    type="radio"
                    name="answer"
                    id="answer-2"
                    className="appearance-none w-5 h-5 border-2 border-gray-500/50 rounded-full"
                  />
                  <label htmlFor="answer-2">{q.answer2}</label>
                </div>
                <div className="flex items-center space-x-4 mx-32">
                  <input
                    type="radio"
                    name="answer"
                    id="answer-3"
                    className="appearance-none w-5 h-5 border-2 border-gray-500/50 rounded-full"
                  />
                  <label htmlFor="answer-3">{q.answer3}</label>
                </div>
                <div className="flex items-center space-x-4 mx-32">
                  <input
                    type="radio"
                    name="answer"
                    id="answer-4"
                    className="appearance-none w-5 h-5 border-2 border-gray-500/50 rounded-full"
                  />
                  <label htmlFor="answer-4">{q.answer4}</label>
                </div>
              </div>
              <button className="mt-6 bg-[#fc7961] text-white h-10 w-1/5 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200">
                Next
              </button>
            </div>
          ))}
        </div>
      </SignedIn>
    </>
  );
};
