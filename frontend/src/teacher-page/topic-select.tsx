import { useState } from "react";
import { TopicList, Topic } from "./types";
import { topicFetcher } from "./topic-select-fetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function TopicSelect({ bootCampId }: { bootCampId: number }) {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery<TopicList>({
    queryKey: ["topics", bootCampId],
    queryFn: () => topicFetcher(bootCampId),
    enabled: bootCampId !== 0,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading topics!</div>;
  }

  return (
    <div>
      <select
        className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
        value="select topic"
      >
        <option value="">Select topic</option>
        {data.topics.map((topic: Topic) => (
          <option key={topic.id} value={topic.value}>
            {topic.label}
          </option>
        ))}
      </select>
    </div>
  );
}