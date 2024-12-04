import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { DeleteTopicCard } from "./fetch-delete-card";
import toast, { ToastBar, Toaster } from "react-hot-toast";

interface Props {
  cardId: number;
  //   topicId: number;
  refresh: () => void;
}

// const queryClient = useQueryClient();

export default function DeleteCardButton({ cardId, refresh }: Props) {
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
        refresh();
        toast.success("Card deleted!");
        // queryClient.invalidateQueries({ queryKey: ["topicCards", topicId] });
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
      <Toaster />
      <button
        className="btn bg-transparent text-blue-500 hover:text-blue-700"
        onClick={() => handleDeleteCard(cardId)}
      >
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
