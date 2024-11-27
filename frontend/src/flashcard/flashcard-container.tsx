import React, { useState } from "react";
import ReactFlipCard from "reactjs-flip-card";
import { flashCard } from "../mocked/mocked-data";
import { Link } from "@tanstack/react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export const Flashcard = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = flashCard[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const isEndReached = currentCardIndex >= flashCard.length;

  const { width, height } = useWindowSize();

  return (
    <>
      {isEndReached ? (
        <>
          <Confetti width={width} height={height} initialVelocityY={25} />
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl text-center mt-10">
              You've reached the end of the flashcards!
            </h1>
            <Link to="/landing">
              <button
                className="bg-rose-600 text-white px-6 py-3 rounded-md mt-6"
                onClick={() => setCurrentCardIndex(0)}
              >
                Go back to the main page
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-center mt-10">{currentCard.question}</h1>

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
                    <div className="flex-grow flex items-center justify-center p-12 text-center text-2xl">
                      <p>{currentCard.answer}</p>
                    </div>
                    <div className="absolute bottom-6 space-x-3 text-white">
                      <button
                        className="bg-red-800 w-24 p-2 rounded-md"
                        onClick={() => nextCard()}
                      >
                        Difficult
                      </button>
                      <button
                        className="bg-yellow-500 w-24 p-2 rounded-md"
                        onClick={() => nextCard()}
                      >
                        Moderate
                      </button>
                      <button
                        className="bg-sky-600 w-24 p-2 rounded-md"
                        onClick={() => nextCard()}
                      >
                        Easy
                      </button>
                      <button
                        className="bg-green-700 w-24 p-2 rounded-md"
                        onClick={() => nextCard()}
                      >
                        Very easy
                      </button>
                    </div>
                  </div>
                  <p
                    className="text-center mt-8 italic text-gray-500"
                    onClick={() => nextCard()}
                  >
                    How difficult was this card? Select an option to continue
                  </p>
                </>
              }
            />
          </div>
        </>
      )}
    </>
  );
};
