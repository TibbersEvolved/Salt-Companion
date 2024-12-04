import { useEffect, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card, CardUpdateData } from "./types";
import { FetchTopicCards } from "./fetch-topic-cards";
import { UpdateCardsFetch } from "./fetch-cards-update";
import DeleteCardButton from "./delete-card-button";

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

  const mutationUpdateCards: UseMutationResult<string, Error, Card[]> =
    useMutation({
      mutationFn: async (updatedCards: Card[]): Promise<string> => {
        if (!updatedCards) {
          throw new Error("List of cards required");
        }

        return await UpdateCardsFetch(updatedCards);
      },
      onSuccess: (data: string) => {
        console.log("Cards updated successfully:", data);
      },
      onError: (error) => {
        console.error("Error updating cards:", error);
      },
    });

  const handleTableChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    thisCard: Card
  ) => {
    const { name, value } = event.target;
    setCardList((prev) =>
      prev.map((card) => {
        if (card.cardId === thisCard.cardId) {
          return { ...card, [name]: value };
        }

        return card;
      })
    );
  };

  const updateHandler = () => {
    console.log("Updated cards:", cardList);
    mutationUpdateCards.mutate(cardList);
  };

  return (
    <div className="card-container relative">
      <button
        className="btn absolute right-5 bg-transparent border-none text-blue-500 hover:text-blue-700 cursor-pointer"
        onClick={updateHandler}
      >
        Update/save cards{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>{" "}
      </button>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cardList.map((card, index) => (
              <tr className="hover" key={card.cardId}>
                <td>{card.cardId}</td>
                <td>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={card.question}
                    readOnly={false}
                    onChange={(event) => handleTableChange(event, card)}
                    name="question"
                  />
                </td>
                <td>
                  {" "}
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={card.answer}
                    readOnly={false}
                    onChange={(event) => handleTableChange(event, card)}
                    name="answer"
                  />
                </td>
                <td>
                  <DeleteCardButton cardId={card.cardId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// hello
