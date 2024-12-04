import { useEffect, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card } from "./types";
import { FetchTopicCards } from "./fetch-topic-cards";

interface Props {
  topicId: number;
}

export default function TopicCards({ topicId }: Props) {
  if (topicId === 0) {
    return <div>No topic selected</div>;
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
  }, [topicId]);

  const handleTableChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    thisCard: Card
  ) => {
    setCardList((prev) => {
      return prev.map((card) => {
        if (card.id === thisCard.id) {
          return { ...card, question: event.target.value };
        }
        return card;
      });
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {cardList.map((card, index) => (
            <tr className="hover" key={index}>
              <td>{card.id}</td>
              <td>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={card.question}
                  readOnly={false}
                  onChange={(event) => handleTableChange(event, card)}
                />
              </td>
              <td>
                {" "}
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={card.answer}
                  readOnly={false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // <div>
    //   {cardList.map((card, index) => (
    //     <div
    //       key={card.id}
    //       tabIndex={0}
    //       className="collapse collapse-arrow border-base-300 bg-base-200 border"
    //     >
    //       <div className="collapse-title text-xl font-medium">
    //         {card.question}
    //       </div>
    //       <div className="collapse-content">
    //         <p>{card.answer}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
