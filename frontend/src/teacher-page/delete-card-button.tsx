import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { DeleteTopicCard } from "./fetch-delete-card";

interface Props {
  cardId: number;
}

// const queryClient = useQueryClient();

export default function DeleteCardButton({ cardId }: Props) {
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({
          queryKey: ["topicCards", cardId],
        });
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
      <button
        className="btn bg-transparent text-blue-500 hover:text-blue-700"
        onClick={() => handleDeleteCard(cardId)}
      >
        Delete
      </button>
    </div>
  );
}
