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

  useEffect(() => {
    setTopicId(0);
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
        // setTopicId(topicId);
        queryClient.invalidateQueries({
          queryKey: ["topics", bootCampId],
        });
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
      },
      onError: (error) => {
        console.error("Error deleting topic:", error);
      },
    });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopicName(e.target.value);
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedRequestBody: TopicPostData = {
      name: newTopicName,
      id: bootCampId,
    };
    console.log("updatedRequestBody", updatedRequestBody);
    mutationCreateTopic.mutate(updatedRequestBody);
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
    <div className="top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50">
      <Toaster />
      <div className="bg-white p-6 rounded-md shadow-md w-full h-full">
        <h1 className="text-xl font-bold">{selectedBootcamp}</h1>
        <p className="mt-4">
          Select or add a topic to manage flashcards for the {selectedBootcamp}{" "}
          bootcamp.
        </p>

        <div className="mt-4 border border-solid border-black">
          <TopicSelect bootCampId={bootCampId} setTopicId={setTopicId} />
          <a
            href="#"
            className={`ml-5 text-blue-500 hover:text-blue-700 ${
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
            className={`ml-5 text-blue-500 hover:text-blue-700 ${
              inActive ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => {
              if (inActive) e.preventDefault();
              else handleDeleteTopic(topicId);
            }}
          >
            Delete Topic
          </a>
          ManageBootcamp///////////////////////////////////////////////
        </div>
        {showNewTopicForm && (
          <div className="fixed top-0 left-0 w-full h-600 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6 ">
              <h1>Add Topic</h1>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Topic name"
                  value={newTopicName}
                  onChange={inputHandler}
                />
                <button
                  className="ml-5  text-blue-500 hover:text-blue-700"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              <button
                className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                onClick={() => setShowNewTopicForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <TopicCards topicId={topicId} />
      </div>
    </div>
  );
};
