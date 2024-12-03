import { useState } from "react";
import { TopicList, Topic } from "./types";
import { topicFetcher } from "./topic-select-fetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  bootCampId: number;
  setTopicId: (topicId: number) => void;
}

export function TopicSelect({ bootCampId, setTopicId }: Props) {
  if (bootCampId === 0) {
    return (
      <select
        className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
        value="No Topics"
      >
        <option value="No Topics" disabled>
          No Topics
        </option>
      </select>
    );
  }

  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery<TopicList>({
    queryKey: ["topics", bootCampId],
    queryFn: () => topicFetcher(bootCampId),
    enabled: bootCampId !== 0,
  });

  if (isPending) {
    return (
      <select
        className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
        defaultValue=""
        onChange={(e) => setTopicId(parseInt(e.target.value))}
      >
        <option value="" disabled>
          Loading...
        </option>
      </select>
    );
  }
  if (isError) {
    return (
      <select
        className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
        defaultValue=""
        onChange={(e) => setTopicId(parseInt(e.target.value))}
      >
        <option value="" disabled>
          Error loading!
        </option>
      </select>
    );
  }

  return (
    <select
      className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
      defaultValue=""
      onChange={(e) => setTopicId(parseInt(e.target.value))}
    >
      <option value="" disabled>
        {data.topics.length === 0 ? "No Topics" : "Select Topic"}
      </option>

      {data.topics.map((topic: Topic) => (
        <option key={topic.id} value={topic.id}>
          {topic.label}
        </option>
      ))}
    </select>
  );
}
