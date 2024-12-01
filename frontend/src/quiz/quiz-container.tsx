import { SignedIn } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { mockedQuiz } from "../mocked/mocked-data";

export const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [difficultTopics, setDifficultTopics] = useState<string[]>([]);

  const currentQuestion = mockedQuiz[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    if (selectedAnswer !== currentQuestion.correctAnswer) {
      setDifficultTopics((prevTopics) => [
        ...new Set([...prevTopics, currentQuestion.topic]),
      ]);
    }

    setSelectedAnswer(null);
    if (currentQuestionIndex === mockedQuiz.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const calculateScore = () => {
    return mockedQuiz.filter(
      (question, index) => question.correctAnswer === userAnswers[index]
    ).length;
  };

  return (
    <>
      <SignedIn>
        {isQuizFinished ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl text-center mt-10">Quiz Completed! 🎉</h1>
            <p className="text-xl mt-4">
              You scored {calculateScore()} out of {mockedQuiz.length}.
            </p>
            {difficultTopics.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl text-red-600">Topics to review:</h2>
                <ul className="text-lg mt-4 list-disc list-inside">
                  {difficultTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
            <Link to="/landing">
              <button className="bg-rose-600 text-white px-6 py-3 rounded-md mt-6">
                Go back to the main page
              </button>
            </Link>
          </div>
        ) : (
          <div className="m-0 p-0 w-screen h-screen flex justify-center items-center">
            <div className=" bg-white rounded-2xl h-3/4 w-3/4 flex flex-col items-center shadow-lg p-8">
              <div className="w-full text-center text-lg font-semibold mb-4">
                Question {currentQuestionIndex + 1} of {mockedQuiz.length}
              </div>

              <h2 className="text-4xl mb-6">{currentQuestion.question}</h2>

              <div className="flex flex-col w-full items-start text-2xl space-y-4">
                {currentQuestion.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 mx-32"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      id={`answer-${index}`}
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={() => setSelectedAnswer(answer)}
                      className="appearance-none w-5 h-5 border-2 border-gray-500/50 rounded-full"
                    />
                    <label htmlFor={`answer-${index}`}>{answer}</label>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                className="mt-6 bg-[#fc7961] text-white h-10 w-1/5 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </SignedIn>
    </>
  );
};
