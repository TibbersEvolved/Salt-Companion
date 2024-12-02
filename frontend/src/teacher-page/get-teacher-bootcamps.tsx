import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateBootCampFetch } from "./fetch-create-bootcamp";
import { TeacherBootCampList } from "./types";
import { useState, useRef, createContext, useContext, useEffect } from "react";
import { FetchTeacherBootCamps } from "./fetch-teacher-bootcamps";

type Props = {
  clerkId: string;
};

export function GetTeacherBootCamp({ clerkId }: Props) {
  const [bootCampName, setBootCampName] = useState<string>("");
  const [bootCampList, setBotCampList] = useState<TeacherBootCampList | null>(
    null
  );

  const mutationGetTeacherBootCamps: UseMutationResult<
    TeacherBootCampList,
    Error,
    string
  > = useMutation({
    mutationFn: async (clerkId: string): Promise<TeacherBootCampList> => {
      if (!clerkId) {
        throw new Error("Teacher id is required");
      }
      return await FetchTeacherBootCamps(clerkId);
    },
    onSuccess: (data: TeacherBootCampList) => {
      console.log("Bootcamp created successfully:", data);
      setBotCampList(data);
    },
    onError: (error) => {
      console.error("Error fetching the current game state:", error);
    },
  });

  useEffect(() => {
    mutationGetTeacherBootCamps.mutate(clerkId);
  }, [clerkId]);

  return (
    <div>
      <select
        className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
        value="select Bootcamp"
      >
        <option value="">Select bootcamp</option>
        {bootCampList?.bootcamps.map((bootcamp) => (
          <option key={bootcamp.id} value={bootcamp.id}>
            {bootcamp.name}
          </option>
        ))}
      </select>
    </div>
  );
}
