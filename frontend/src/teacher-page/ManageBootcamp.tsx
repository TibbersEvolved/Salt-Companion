import React, { useState } from "react";
import { TopicSelect } from "./topic-select";
import { TopicPostData } from "./types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateTopicFetch } from "./fetch-create-topic";

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
        console.log("Topic created successfully:", data);
        queryClient.invalidateQueries({
          queryKey: ["topics", bootCampId],
        });
      },
      onError: (error) => {
        console.error("Error creating topic:", error);
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

  return (
    <div className="top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6">
        <h1 className="text-xl font-bold">{selectedBootcamp}</h1>
        <p className="mt-4">
          Here you can manage flashcards for the {selectedBootcamp} bootcamp.
        </p>

        <TopicSelect bootCampId={bootCampId} />

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Add topic"
            value={newTopicName}
            onChange={inputHandler}
          />
          <button type="submit">Submit</button>
        </form>

        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
