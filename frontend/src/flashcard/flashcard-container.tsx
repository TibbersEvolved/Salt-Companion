import React from "react";
import ReactFlipCard from "reactjs-flip-card";

export const Flashcard = () => {
  return (
    <>
      <h1 className="text-3xl text-center mt-10">flashcard.title</h1>

      <div className="flex justify-center mt-16 space-y-36 bg-">
        <ReactFlipCard
          flipTrigger="onClick"
          containerCss="w-[600px] h-96 bg-sky-300 flex items-center justify-center relative rounded-lg"
          frontComponent={
            <div className="flex items-center justify-center h-full">
              <p>Click to see the answer</p>
            </div>
          }
          backComponent={
            <>
              <div className="flex flex-col  bg-red-300 justify-between h-full items-center rounded-lg">
                <div className="flex-grow flex items-center justify-center">
                  <p>Here's your answer</p>
                </div>
                <div className="absolute bottom-6 space-x-3 text-white">
                  <button className="bg-red-800 w-24 p-2 rounded-md">
                    Difficult
                  </button>
                  <button className="bg-yellow-500 w-24 p-2 rounded-md">
                    Moderate
                  </button>
                  <button className="bg-sky-600 w-24 p-2 rounded-md">
                    Easy
                  </button>
                  <button className="bg-green-700 w-24 p-2 rounded-md">
                    Very easy
                  </button>
                </div>
              </div>
            </>
          }
        />
      </div>
    </>
  );
};
