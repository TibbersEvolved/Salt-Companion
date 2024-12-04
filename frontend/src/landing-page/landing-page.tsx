import { SignedIn, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import Select from "react-select";
import { useState } from "react";
import { Flashcard } from "../flashcard/flashcard-container";
import { getStudentData, startFlashcardSession } from "../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "../services/loadingScreen";
import UserStat from "./userStat";
import TopicsChart from "./topics-chart";
import ProgressBar from "./progress-bar";

export const LandingPage = (prop: userProp) => {
  const client = useQueryClient();
  const { user, isLoaded } = useUser();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [sessionId, setSessionId] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["loadUser"],
    queryFn: () => getStudentData(prop.userId),
  });

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  if (isLoading)
    return <LoadingScreen displayText="User found! Fetching profile" />;
  if (isError) return <div>Server Error, user id: {user?.id as string}</div>;

  const handleClick = async () => {
    let topics: number[] = new Array();
    selectedOptions.forEach((index) => {
      topics.push(index.value);
    });
    if (topics.length === 0) {
      return;
    }
    const response = await startFlashcardSession(
      10,
      topics,
      user?.id as string
    );
    setSessionId(response.id);
    setPage(2);
  };

  const handleReturn = () => {
    client.invalidateQueries({
      queryKey: ["loadUser"],
      refetchType: "all",
    });
    setPage(1);
  };

  if (page === 2) {
    return <Flashcard sessionId={sessionId} callBack={() => handleReturn()} />;
  }

  const topicData = data.topics.topics;

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl p-6 grid grid-cols-1 gap-8">
          <div className="space-y-5">
            <h2 className="text-4xl font-bold mb-2 text-center">
              Welcome, {user?.firstName}!
            </h2>
            <h3 className="text-2xl font-semibold mb-2 text-center">
              Practice with flashcards
            </h3>
            <div className="flex flex-col items-center">
              <Select
                isMulti
                options={topicData}
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
            <hr />
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">
                Not sure what to study?
              </h3>
              <p className="text-[#424242]">
                Take our quiz to find your focus!
              </p>
              <button
                onClick={handleClick}
                className="m-6 bg-[#fc7961] text-white h-10 w-24 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
              >
                <Link to="/quiz">Quiz</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl mt-8 p-6">
          <h2 className="text-center text-3xl font-bold mb-4">Stats</h2>
          <div className="border border-gray-300 rounded-lg p-4 space-y-10">
            <section className="flex flex-wrap gap-5 justify-center">
              <UserStat
                text={"Current Streak " + data.currentStreak}
                tooltip="The amount of days you have used the app in a row"
              />
              <UserStat
                text={"Record Streak " + data.streak}
                tooltip="Your lifetime highscore of days used in a row"
              />
              <UserStat
                text={"Total Cards Flipped: " + data.totalCardsFlipped}
                tooltip="Lifetime total of cards flipped!"
              />
            </section>
            <section>
              <TopicsChart topicStats={data.topicStats} />
            </section>
            <section>
              <p className="text-center mb-6">Your progress so far</p>
              <ProgressBar average={data.studentAverage} />
            </section>
          </div>
        </div>
      </div>
    </SignedIn>
  );
};

type userProp = {
  userId: string;
};
