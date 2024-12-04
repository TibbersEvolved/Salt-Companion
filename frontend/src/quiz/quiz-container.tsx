import React, { useState } from "react";
import { mockedQuiz } from "../mocked/mocked-data";

function getRandomQuestionsWithTopics(allQuestions, numberOfQuestions = 15) {
  const groupedByTopic = allQuestions.reduce((acc, question) => {
    if (!acc[question.topic]) acc[question.topic] = [];
    acc[question.topic].push(question);
    return acc;
  }, {});

  let selectedQuestions = [];
  for (const topic in groupedByTopic) {
    const topicQuestions = groupedByTopic[topic];
    const randomIndex = Math.floor(Math.random() * topicQuestions.length);
    selectedQuestions.push(topicQuestions[randomIndex]);
  }

  const remainingQuestions = numberOfQuestions - selectedQuestions.length;
  if (remainingQuestions > 0) {
    const remainingPool = allQuestions.filter(
      (q) => !selectedQuestions.includes(q)
    );
    const additionalQuestions = [];
    while (additionalQuestions.length < remainingQuestions) {
      const randomIndex = Math.floor(Math.random() * remainingPool.length);
      additionalQuestions.push(remainingPool.splice(randomIndex, 1)[0]);
    }
    selectedQuestions = [...selectedQuestions, ...additionalQuestions];
  }

  return selectedQuestions.sort(() => Math.random() - 0.5);
}

type UserAnswer = {
  question: string;
  selectedAnswer: string;
  correct: boolean;
};

// Quiz Component
export const Quiz = () => {
  const [quizQuestions] = useState(
    getRandomQuestionsWithTopics(mockedQuiz, 15)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correct: selectedAnswer === currentQuestion.correctAnswer,
      },
    ]);
    setSelectedAnswer(null);

    if (currentQuestionIndex === quizQuestions.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const calculateScore = () => {
    return userAnswers.filter((answer) => answer.correct).length;
  };

  return (
    <div className="quiz-container bg-gray-100 p-6 min-h-screen flex flex-col items-center justify-center">
      {isQuizFinished ? (
        <div className="result bg-white p-6 rounded-lg shadow-lg w-1/2 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Completed!
          </h1>
          <p className="text-xl text-gray-600">
            You scored{" "}
            <span className="font-bold text-[#424242]">{calculateScore()}</span>{" "}
            out of{" "}
            <span className="font-bold text-[#424242]">
              {quizQuestions.length}
            </span>
            .
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-[#424242] mb-4">
              Topics to Review:
            </h2>
            <ul className="text-center text-white space-y-2">
              {[
                ...new Set(
                  userAnswers
                    .filter((answer) => !answer.correct)
                    .map(
                      (answer) =>
                        quizQuestions.find(
                          (q) => q.question === answer.question
                        )?.topic
                    )
                ),
              ].map((topic, index) => (
                <li key={index} className="p-2 rounded bg-[#fc7961]">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="question-container bg-[#eed1d6] p-6 rounded-2xl shadow-md w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-2">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </h2>
          <p className="text-[#424242] text-lg mb-4">
            {currentQuestion.question}
          </p>
          <div className="answers space-y-3">
            {currentQuestion.answers.map((answer, index) => (
              <label
                key={index}
                className={`block bg-gray-100 p-2 rounded-lg border-2 ${
                  selectedAnswer === answer
                    ? "border-[#0f2d45] bg-[#0f2e48] text-white"
                    : "border-gray-100"
                } cursor-pointer`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={() => setSelectedAnswer(answer)}
                  className="hidden"
                />
                {answer}
              </label>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="mt-6 bg-[#fc7961] text-white h-10 w-24 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
          >
            {currentQuestionIndex === quizQuestions.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};
