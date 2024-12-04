import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { DeleteTopicCard } from "./fetch-delete-card";

interface Props {
  cardId: number;
}

export default function DeleteCardButton(cardId: Props) {
  const mutationDeleteCard: UseMutationResult<string, Error, number, unknown> =
    useMutation<string, Error, number, unknown>({
      mutationFn: async (cardId: number): Promise<string> => {
        if (!cardId) {
          throw new Error("Card id is required");
        }

        return await DeleteTopicCard(cardId);
      },
      onSuccess: (data: string) => {
        console.log("Card deleted successfully:", data);
      },
      onError: (error: unknown) => {
        console.error("Error deleting card:", error);
      },
    });

  const handleDeleteCard = (cardId: number) => {
    mutationDeleteCard.mutate(cardId);
  };

  return (
    <div>
      <button onClick={() => handleDeleteCard(1)}>Delete</button>
    </div>
  );
}
