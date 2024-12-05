import React, { useEffect, useState } from "react";
import { TopicSelect } from "./topic-select";
import { TopicPostData } from "./types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateTopicFetch } from "./fetch-create-topic";
import TopicCards from "./topic-cards";
import { DeleteTopicCard } from "./fetch-delete-card";
import { DeleteTopic } from "./fetch-delete-topic";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Toast } from "flowbite-react";
import { Students } from "./studentManagement";

interface ManageBootcampProps {
  selectedBootcamp: string;
  onClose: () => void;
  bootCampId: number;
}

export const ManageBootcamp: React.FC<ManageBootcampProps> = ({
  selectedBootcamp,
  onClose,
  bootCampId,
}) => {
  const [newTopicName, setNewTopicName] = useState("");
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [topicId, setTopicId] = useState(0);
  const [showManageStudent, setShowMAnageStudent] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<number | "">("");

  useEffect(() => {
    setTopicId(0);
    setSelectedTopic("");
  }, [bootCampId]);

  const queryClient = useQueryClient();

  const mutationCreateTopic: UseMutationResult<string, Error, TopicPostData> =
    useMutation({
      mutationFn: async (requestBody: TopicPostData): Promise<string> => {
        if (!requestBody) {
          throw new Error("Request body is required");
        }
        return await CreateTopicFetch(requestBody);
      },
      onSuccess: (data: string) => {
        toast.success("Topic created!");
        console.log("Topic created successfully:", data);

        queryClient.invalidateQueries({
          queryKey: ["topics", bootCampId],
        });
        setTopicId(0);
        setSelectedTopic("");
      },
      onError: (error) => {
        console.error("Error creating topic:", error);
      },
    });

  const mutationDeleteTopic: UseMutationResult<string, Error, number> =
    useMutation({
      mutationFn: async (topicId: number): Promise<string> => {
        if (!topicId) {
          throw new Error("Topic id is required");
        }
        return await DeleteTopic(topicId);
      },
      onSuccess: (data: string) => {
        toast.success("Topic deleted!");
        setTopicId(0);
        queryClient.invalidateQueries({
          queryKey: ["topics", bootCampId],
        });
        setTopicId(0);
        setSelectedTopic("");
      },
      onError: (error) => {
        console.error("Error deleting topic:", error);
      },
    });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopicName(e.target.value);
  };

  const handleShowManageStudent = () => {
    setShowMAnageStudent(true);
  };

  const closeShowManageStudent = () => {
    setShowMAnageStudent(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedRequestBody: TopicPostData = {
      name: newTopicName,
      id: bootCampId,
    };
    console.log("updatedRequestBody", updatedRequestBody);
    mutationCreateTopic.mutate(updatedRequestBody);
    setShowNewTopicForm(false);
  };

  const inActive =
    selectedBootcamp === "No Bootcamp Selected" ||
    bootCampId === 0 ||
    selectedBootcamp === "Select bootcamp";

  const handleDeleteTopic = (topicId: number) => {
    console.log("topicId", topicId);
    mutationDeleteTopic.mutate(topicId);
  };

  return (
    <div className="top-0 left-0 w-full h-screen flex justify-center items-center  bg-opacity-50">
      <Toaster />

      <div className="bg-white p-6 rounded-md shadow-md w-full h-full relative">
        <button
          className="absolute top-6 right-6 px-4 h-10 text-center font-semibold text-lg text-white bg-[#fc7961] rounded-full hover:bg-[#f35b7e] transition duration-200"
          onClick={handleShowManageStudent}
        >
          Handle students
        </button>

        <h1 className="text-3xl font-bold">{selectedBootcamp}</h1>
        <div className="mt-4">
          <TopicSelect
            bootCampId={bootCampId}
            setTopicId={setTopicId}
            selectedTopic={selectedTopic} // Pass state
            setSelectedTopic={setSelectedTopic}
          />
          <a
            href="#"
            className={`ml-5 text-lg font-light text-[#424242] hover:text-[#f35b7e] hover:font-medium ${
              inActive ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (inActive) e.preventDefault();
              else setShowNewTopicForm(!showNewTopicForm);
            }}
          >
            Add Topic
          </a>
          <a
            href="#"
            className={`ml-5 text-lg font-light text-[#424242] hover:text-[#f35b7e] hover:font-medium ${
              inActive ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (inActive) e.preventDefault();
              else handleDeleteTopic(topicId);
            }}
          >
            Delete Topic
          </a>
        </div>

        {showNewTopicForm && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white p-12 rounded-md shadow-md w-3/6 h-fit">
              <button
                className="absolute top-5 right-5 btn btn-circle bg-white hover:bg-[#f35b7e] hover:text-white"
                onClick={() => setShowNewTopicForm(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Add Topic</h1>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Topic name"
                  value={newTopicName}
                  onChange={inputHandler}
                  className="rounded-md w-3/5 focus:ring-[#f7a1b5] border-[#e5e7eb] focus:border-[#f7a1b5]"
                />
                <button
                  className="m-6 bg-[#fc7961] text-white h-10 px-4 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        {showManageStudent && (
          <div className="fixed z-20 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative bg-white p-10 rounded-md shadow-md w-5/6 h-fit">
              <button
                className="absolute top-8 right-8 btn btn-circle bg-white hover:bg-[#f35b7e] hover:text-white"
                onClick={closeShowManageStudent}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Students bootCampId={bootCampId} />
              <br />
            </div>
          </div>
        )}
        <TopicCards topicId={topicId} />
      </div>
    </div>
  );
};
