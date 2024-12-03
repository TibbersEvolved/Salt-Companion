import { useEffect, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card } from "./types";
import { FetchTopicCards } from "./fetch-topic-cards";

interface Props {
  topicId: number;
}

export default function TopicCards({ topicId }: Props) {
  if (topicId === 0) {
    return (
      <div>
        <div className="collapse collapse-arrow bg-base-200">
          <div>
            <input type="radio" name="my-accordion" id={`accordion-0`} />
            <div className="collapse-title text-xl font-medium">
              No cards available
            </div>
            <div className="collapse-content">
              <p>No cards available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const [cardList, setCardList] = useState<Card[]>([]);

  const mutationGetTopicCards: UseMutationResult<Card[], Error, number> =
    useMutation({
      mutationFn: async (topicId: number): Promise<Card[]> => {
        if (!topicId) {
          throw new Error("Topic id is required");
        }
        console.log("Fetching cards for topic ID:", topicId);
        return await FetchTopicCards(topicId);
      },
      onSuccess: (data: Card[]) => {
        console.log("Cards Fetched successfully:", data);
        setCardList(data);
      },
      onError: (error) => {
        console.error("Error fetching topic cards:", error);
      },
    });

  useEffect(() => {
    mutationGetTopicCards.mutate(topicId);
  }, []);

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200">
        {cardList.map((card, index) => (
          <div key={index}>
            <input type="radio" name="my-accordion" id={`accordion-${index}`} />
            <div className="collapse-title text-xl font-medium">
              {card.question}
            </div>
            <div className="collapse-content">
              <p>{card.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
