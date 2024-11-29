import React, { useState } from "react";
import ReactFlipCard from "reactjs-flip-card";
import { flashCard } from "../mocked/mocked-data";
import { Link } from "@tanstack/react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { getFlashcardQuestions } from "../services/api";

type FlashcardProps = {
  sessionId: string;
};

export const Flashcard = (prop: FlashcardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = flashCard[currentCardIndex];
  const { width, height } = useWindowSize();

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const isEndReached = currentCardIndex >= flashCard.length;

  // const { data: flashCards, isLoading, isError } = useQuery({
  //   queryKey: ["flashCards"],
  //   queryFn: getFlashcardQuestions,
  // });

  // const nextCard = () => {
  //   setCurrentCardIndex((prevIndex) => prevIndex + 1);
  // }

  // const isEndReached = currentCardIndex >= flashCards.length;
  // const currentCard = flashCards[currentCardIndex];

  // if (isLoading) return <div>Loading pls add toast</div>
  // if (isError) return <div>Error pls add toas</div>

  return (
    <>
      {isEndReached ? (
        <>
          {/* <Confetti width={width} height={height} initialVelocityY={25} /> */}
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
          <div className="flex items-center justify-center h-screen">
            <div className="bg-[#eed1d6] h-[670px] w-[750px] rounded-2xl">
              <div className="text-center space-y-5 mt-5">
                <p className="text-[#f36384]">TOPIC NAME</p>
                <h2 className="text-3xl font-extrabold">
                  {currentCard.question}
                </h2>
                {/* {currentCard && (
                <h2 className="text-3xl font-extrabold">{currentCard.question}</h2>
              )} */}
              </div>
              <div className="flex justify-center mt-10 space-y-36">
                {/* {currentCard && (whole ReactFlipCard component)} */}
                <ReactFlipCard
                  flipTrigger="onClick"
                  containerCss="w-[600px] h-96 bg-white shadow-md flex items-center justify-center relative rounded-2xl"
                  frontComponent={
                    <div className="flex items-center justify-center h-full">
                      <p className="text-2xl text-[#424242]">
                        Click to see the answer
                      </p>
                    </div>
                  }
                  backComponent={
                    <>
                      <div className="flex flex-col  bg-[#0f2d45] text-white justify-between h-full items-center rounded-2xl">
                        <div className="flex-grow flex items-center justify-center p-12 text-center text-2xl">
                          <p className="font-bold">{currentCard.answer}</p>
                        </div>
                      </div>
                      <p
                        className="text-center mt-5 text-[#424242]"
                        onClick={() => nextCard()}
                      >
                        How difficult was this card? Select an option to
                        continue
                      </p>
                      <div className="space-x-3 text-white flex-grow flex items-center justify-center mt-5">
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
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
