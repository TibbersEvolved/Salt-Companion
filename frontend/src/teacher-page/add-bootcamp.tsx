import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateBootCampFetch } from "./fetch-create-bootcamp";
import { BootCampData } from "./types";
import { useState, useRef, createContext, useContext, useEffect } from "react";

export function CreateBootCamp() {
  const [bootCampName, setBootCampName] = useState<string>("");
  const [clerkId, setClerkId] = useState<string>("");
  const [requestBody, setRequestBody] = useState<BootCampData>({
    name: bootCampName,
    clerkId: clerkId,
  });

  const mutationCreateGame: UseMutationResult<string, Error, BootCampData> =
    useMutation({
      mutationFn: async (requestBody: BootCampData): Promise<string> => {
        if (!requestBody) {
          throw new Error("Request body is required");
        }
        return await CreateBootCampFetch(requestBody);
      },
      onSuccess: (data: string) => {
        if (data) {
          mutationCreateGame.mutate(requestBody);
        }
      },
      onError: (error) => {
        console.error("Error fetching the current game state:", error);
      },
    });

  return (
    <div>
      <input
        type="text"
        value={bootCampName}
        onChange={(e) => setBootCampName(e.target.value)}
        placeholder="Bootcamp name"
      />
      <button
        onClick={() => {
          setRequestBody({
            name: bootCampName,
            clerkId: clerkId,
          });
          mutationCreateGame.mutate(requestBody);
        }}
      >
        Create Bootcamp
      </button>
    </div>
  );
}
