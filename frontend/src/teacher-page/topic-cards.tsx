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
import { GptOneCardFetch } from "./fetch-gpt-one";

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

  const mutationAiCard: UseMutationResult<Card[], Error, Card[]> = useMutation({
    mutationFn: async (currentCards: Card[]): Promise<Card[]> => {
      if (!currentCards) {
        throw new Error("List of cards required");
      }

      const prompt = currentCards.map((card) => card.question).join("\n");
      console.log("Prompt:", prompt);

      return await GptOneCardFetch(prompt, topicId);
    },
    onSuccess: (data: Card[]) => {
      console.log("GPT card fetched successfully:", data);
      setCardList(data);
      const newCard = data.map((card) => {
        return {
          topicId: topicId,
          question: card.question,
          answer: card.answer,
        };
      });
      mutationAddCard.mutate(newCard);
    },
    onError: (error) => {
      console.error("Error fetching GPT card:", error);
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
    if (cardList.length === 0) {
      toast.error("No cards to update");
      return;
    }
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
        localNewCards.push(createdCard);
      }
    }
    if (localNewCards.length > 0) {
      await mutationAddCard.mutate(localNewCards);
      toast.success("New card created and saved!");
      return;
    }

    await mutationUpdateCards.mutate(cardList);
    toast.success("Cards updated and saved!");
  };

  const aiCardHandler = async () => {
    for (let card of cardList) {
      if (card.cardId === 0) {
        toast.error("Please fill the current card before adding a new card");
        return;
      }
    }

    await mutationAiCard.mutate(cardList);
  };

  const addCardHandler = async () => {
    for (let card of cardList) {
      if (card.cardId === 0) {
        toast.error("Please fill the current card before adding a new card");
        return;
      }
    }

    const newCard: Card = {
      cardId: 0,
      question: "",
      answer: "",
    };

    await setCardList([newCard, ...cardList]);
    setUpdateGate(true);
  };

  useEffect(() => {
    if (updateGate) {
      mutationUpdateCards.mutate(cardList);
      setUpdateGate(false);
    }
  }, [updateGate, cardList]);

  return (
    <div className="card-container ">
      <Toaster />
      <div className="mt-4 border border-black">
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
        <button
          className="btn right-5 bg-transparent border-none text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={aiCardHandler}
        >
          Ai Card
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
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
            />
          </svg>
        </button>
        topic-cards ///////////////////////////////////////////////
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Question</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cardList.map((card, index) => (
              <tr className="hover" key={card.cardId}>
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
