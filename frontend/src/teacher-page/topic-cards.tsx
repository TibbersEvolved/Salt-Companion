import { useEffect, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card, CardUpdateData } from "./types";
import { FetchTopicCards } from "./fetch-topic-cards";
import { UpdateCardsFetch } from "./fetch-cards-update";

interface Props {
  topicId: number;
}

export default function TopicCards({ topicId }: Props) {
  if (topicId === 0) {
    return <div>No topic selected</div>;
  }
  const [cardList, setCardList] = useState<Card[]>([]);
  const [updatedCards, setUpdatedCards] = useState<CardUpdateData[]>([]);

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
    const { name, value } = event.target;

    setCardList((prev) =>
      prev.map((card) =>
        card.id === thisCard.id ? { ...card, [name]: value } : card
      )
    );

    setUpdatedCards((prev) => {
      const updatedCard: CardUpdateData = {
        question: name === "question" ? value : thisCard.question,
        answer: name === "answer" ? value : thisCard.answer,
        topicId: topicId,
      };

      const existingIndex = prev.findIndex(
        (card) =>
          card.question === thisCard.question &&
          card.answer === thisCard.answer &&
          card.topicId === updatedCard.topicId
      );

      if (existingIndex !== -1) {
        return [
          ...prev.slice(0, existingIndex),
          updatedCard,
          ...prev.slice(existingIndex + 1),
        ];
      }

      return [...prev, updatedCard];
    });
  };

  const mutationUpdateCards: UseMutationResult<
    string,
    Error,
    CardUpdateData[]
  > = useMutation({
    mutationFn: async (updatedCards: CardUpdateData[]): Promise<string> => {
      if (!updatedCards) {
        throw new Error("List of cards required");
      }

      return await UpdateCardsFetch(updatedCards);
    },
    onSuccess: (data: string) => {
      console.log("Cards updated successfully:", data);
      setUpdatedCards([]);
    },
    onError: (error) => {
      console.error("Error updating cards:", error);
    },
  });

  const updateHandler = () => {
    console.log("Updated cards:", updatedCards);
    mutationUpdateCards.mutate(updatedCards);
  };

  return (
    <div className="card-container">
      <button onClick={updateHandler}>Update edited cards </button>
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
    </div>
  );
}
