import React, { useState } from "react";
import ReactFlipCard from "reactjs-flip-card";
import { flashCard } from "../mocked/mocked-data";
import { Link } from "@tanstack/react-router";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFlashcardQuestions } from "../services/api";
import LoadingSpinner from "../shared/loadingSpinner";
import LoadingScreen from "../services/loadingScreen";
import axios from "axios";

type FlashcardProps = {
  sessionId: string;
  callBack: genericCallback;
};

export interface genericCallback {
  (): void;
}

type FlashcardQuestionsAndAnswers = {
  topic: string;
  question: string;
  answer: string;
  cardLeft: number;
};

export const Flashcard = (prop: FlashcardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { width, height } = useWindowSize();
  const client = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["flashCards"],
    queryFn: () => getFlashcardQuestions(prop.sessionId),
  });

  const base_url = import.meta.env.VITE_BASE_URL;
  const sendAnswer = async (answer: number) => {
    try {
      await axios.post(`${base_url}/flashSession/answer`, {
        sessionId: prop.sessionId,
        answer,
      });
      console.log(`answer is number ${answer}`);
      nextCard();
    } catch (error) {
      console.log("Error sending answer");
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
    client.invalidateQueries({
      queryKey: ["flashCards"],
      refetchType: "all",
    });
  };

  if (isLoading) return <LoadingScreen displayText="" />;
  if (isError) return <div>Error pls add toast</div>;

  const typeData: FlashcardQuestionsAndAnswers = data;
  const isEndReached = 0 >= typeData.cardLeft;
  const topic = typeData.topic.toUpperCase();

  return (
    <>
      {isEndReached ? (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl text-center font-light">
              You've reached the end of the flashcards!
            </h1>
            <Link to="/landing">
              <button
                className="m-6 bg-[#fc7961] text-white h-10 w-56 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
                onClick={prop.callBack}
              >
                Back to main page
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center h-screen">
            <div className="bg-[#eed1d6] min-h-[620px] w-[750px] rounded-2xl">
              <div className="text-center space-y-3 mt-5">
                <p className="text-[#f36384]">{topic}</p>
                <h2 className="text-2xl font-extrabold px-12">
                  {typeData.question}
                </h2>
              </div>
              <div className="flex justify-center mt-10 space-y-5">
                <ReactFlipCard
                  flipTrigger="onClick"
                  containerCss="w-[600px] h-80 bg-white shadow-md flex items-center justify-center relative rounded-2xl"
                  frontComponent={
                    <div className="flex items-center justify-center h-full">
                      <p className="text-xl text-[#424242]">
                        Click to see the answer
                      </p>
                    </div>
                  }
                  backComponent={
                    <>
                      <div className="flex flex-col  bg-[#0f2d45] text-white justify-between h-full items-center rounded-2xl">
                        <div className="flex-grow flex items-center justify-center p-12 text-center text-xl">
                          <p className="font-bold">{typeData.answer}</p>
                        </div>
                      </div>
                      <p className="text-center mt-5 text-[#424242]">
                        How difficult was this card? Select an option to
                        continue
                      </p>
                      <div className="space-x-1 text-white flex-grow flex items-center justify-center mt-5">
                        <button
                          className="bg-red-700 w-24 p-2 rounded-l-full"
                          onClick={() => sendAnswer(0)}
                        >
                          Difficult
                        </button>
                        <button
                          className="bg-yellow-400 w-24 p-2 "
                          onClick={() => sendAnswer(1)}
                        >
                          Moderate
                        </button>
                        <button
                          className="bg-sky-600 w-24 p-2 "
                          onClick={() => sendAnswer(2)}
                        >
                          Easy
                        </button>
                        <button
                          className="bg-green-600 w-24 p-2 rounded-r-full"
                          onClick={() => sendAnswer(3)}
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
