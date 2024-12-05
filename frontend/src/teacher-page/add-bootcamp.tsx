import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateBootCampFetch } from "./fetch-create-bootcamp";
import { BootCampPostData } from "./types";
import { useState, useRef, createContext, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  clerkId: string;
};

export function CreateBootCamp(Prop: Props) {
  const [bootCampName, setBootCampName] = useState<string>("");
  const [requestBody, setRequestBody] = useState<BootCampPostData>({
    name: bootCampName,
    clerkId: Prop.clerkId,
  });

  const mutationBootCamp: UseMutationResult<string, Error, BootCampPostData> =
    useMutation({
      mutationFn: async (requestBody: BootCampPostData): Promise<string> => {
        if (!requestBody) {
          throw new Error("Request body is required");
        }
        return await CreateBootCampFetch(requestBody);
      },
      onSuccess: (data: string) => {
        toast.success("Bootcamp created successfully");
      },
      onError: (error) => {
        console.error("Error fetching the current game state:", error);
      },
    });

  return (
    <div>
      <Toaster />
      <input
        type="text"
        value={bootCampName}
        onChange={(e) => setBootCampName(e.target.value)}
        placeholder="Bootcamp name"
        className="rounded-md w-2/6"
      />
      <button
        className="m-4 bg-[#fc7961] text-white h-10 pl-3 pr-3 rounded-md text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
        onClick={() => {
          const updatedRequestBody = {
            name: bootCampName,
            clerkId: Prop.clerkId,
          };
          mutationBootCamp.mutate(updatedRequestBody);
        }}
      >
        Create Bootcamp
      </button>
    </div>
  );
}
