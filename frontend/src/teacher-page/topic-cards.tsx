import { useEffect, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card, CardUpdateData } from "./types";
import { FetchTopicCards } from "./fetch-topic-cards";
import { UpdateCardsFetch } from "./fetch-cards-update";
import DeleteCardButton from "./delete-card-button";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { CreateCardsFetch } from "./fetch-card-add-new-";
import { CardNewData } from "./types";
import { create } from "@mui/material/styles/createTransitions";

interface Props {
  topicId: number;
}

export default function TopicCards({ topicId }: Props) {
  if (topicId === 0) {
    return <div>No topic selected</div>;
  }
  const [cardList, setCardList] = useState<Card[]>([]);
  const [newCards, setNewCards] = useState<CardNewData[]>([]);
  const [updateGate, setUpdateGate] = useState(false);

  const mutationGetTopicCards: UseMutationResult<Card[], Error, number> =
    useMutation({
      mutationFn: async (topicId: number): Promise<Card[]> => {
        if (!topicId) {
          throw new Error("Topic id is required");
        }
        return await FetchTopicCards(topicId);
      },
      onSuccess: (data: Card[]) => {
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

  const mutationAddCard: UseMutationResult<string, Error, CardNewData[]> =
    useMutation({
      mutationFn: async (newCards: CardNewData[]): Promise<string> => {
        if (!newCards) {
          throw new Error("List of cards required");
        }

        return await CreateCardsFetch(newCards);
      },
      onSuccess: (data: string) => {
        console.log("Cards created successfully:", data);
        mutationGetTopicCards.mutate(topicId);
      },
      onError: (error) => {
        console.error("Error creating cards:", error);
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

  const updateHandler = async () => {
    for (let card of cardList) {
      if (card.question === "" || card.answer === "") {
        toast.error("No card question or answer may be empty");

        return;
      }
    }
    const localNewCards: CardNewData[] = [];

    for (let card of cardList) {
      if (card.cardId === 0) {
        const createdCard: CardNewData = {
          topicId: topicId,
          question: card.question,
          answer: card.answer,
        };
        console.log("New card:", createdCard);
        localNewCards.push(createdCard);
        // await setNewCards([...newCards, createdCard]);
      }
    }
    if (localNewCards.length > 0) {
      await mutationAddCard.mutate(localNewCards);
    } else {
      console.log("No new cards to add");
    }

    console.log("Updated cards:", cardList);
    await mutationUpdateCards.mutate(cardList);
  };

  const addCardHandler = async () => {
    for (let card of cardList) {
      if (card.cardId === 0) {
        toast.error("Please fill the current card before adding a new card");
        return;
      }
    }
    // const tempCardList = cardList;

    const newCard: Card = {
      cardId: 0,
      question: "",
      answer: "",
    };
    // tempCardList.push(newCard);

    await setCardList([newCard, ...cardList]);
    setUpdateGate(true);
    // await mutationUpdateCards.mutate(cardList);
  };

  useEffect(() => {
    if (updateGate) {
      mutationUpdateCards.mutate(cardList);
      //   mutationGetTopicCards.mutate(topicId);
      setUpdateGate(false);
    }
  }, [updateGate, cardList]);

  return (
    <div className="card-container ">
      <Toaster />
      <button
        className="btn right-5 bg-transparent border-none text-blue-500 hover:text-blue-700 cursor-pointer"
        onClick={updateHandler}
      >
        Save cards{" "}
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
      <button
        className="btn right-5 bg-transparent border-none text-blue-500 hover:text-blue-700 cursor-pointer"
        onClick={addCardHandler}
      >
        New Card
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
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
                <td className="sort">{index}</td>
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
                  <DeleteCardButton
                    cardId={card.cardId}
                    refresh={() => mutationGetTopicCards.mutate(topicId)}
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
// hello
