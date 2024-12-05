import { useEffect, useState } from "react";
import { TopicList, Topic } from "./types";
import { topicFetcher } from "./topic-select-fetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  bootCampId: number;
  setTopicId: (topicId: number) => void;
}

export function TopicSelect({ bootCampId, setTopicId }: Props) {
  const [selectedTopicThis, setSelectedTopicThis] = useState<number | "">("");

  useEffect(() => {
    setSelectedTopicThis("");
    setTopicId(0);
  }, [bootCampId, setTopicId]);

  //   if (bootCampId === 0) {
  //     return (
  //       <select
  //         className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
  //         value="No Topics"
  //       >
  //         <option value="No Topics" disabled>
  //           No Topics
  //         </option>
  //       </select>
  //     );
  //   }

  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery<TopicList>({
    queryKey: ["topics", bootCampId],
    queryFn: () => topicFetcher(bootCampId),
    enabled: bootCampId !== 0,
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topicId = parseInt(e.target.value, 10);

    setTopicId(topicId);
    if (topicId === 0) {
      setSelectedTopicThis("");
    } else {
      setSelectedTopicThis(topicId);
    }
  };

  if (isPending) {
    return (
      <select
        className="text-lg min-w-40 px-2 text-center border-1 border-[#e5e7eb] bg-white rounded-md focus:ring-[#f7a1b5] focus:border-[#f7a1b5]"
        defaultValue=""
        onChange={handleSelect}
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
        onChange={handleSelect}
      >
        <option value="" disabled>
          Error loading!
        </option>
      </select>
    );
  }

  return (
    <select
      className="text-lg min-w-40 px-2 text-center border-1 border-[#e5e7eb] bg-white rounded-md focus:ring-[#f7a1b5] focus:border-[#f7a1b5]"
      value={selectedTopicThis}
      onChange={handleSelect}
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
