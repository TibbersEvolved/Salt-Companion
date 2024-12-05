import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { CreateBootCampFetch } from "./fetch-create-bootcamp";
import { TeacherBootCampList } from "./types";
import { useState, useRef, createContext, useContext, useEffect } from "react";
import { FetchTeacherBootCamps } from "./fetch-teacher-bootcamps";

type Props = {
  clerkId: string;
  setSelectedBootCampId: (bootCampId: number) => void;
  setSelectedBootCampName: (bootCampName: string) => void;
};

export function GetTeacherBootCamp({
  clerkId,
  setSelectedBootCampId,
  setSelectedBootCampName,
}: Props) {
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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBootCampId(parseInt(event.target.value));
    setSelectedBootCampName(event.target.selectedOptions[0].text);
  };

  return (
    <select
      className="text-lg w-fit px-2 text-center border-1 border-[#e5e7eb] bg-white rounded-md focus:ring-[#f7a1b5] focus:border-[#f7a1b5]"
      onChange={handleSelect}
    >
      <option value="0">Select bootcamp</option>
      {bootCampList?.bootcamps.map((bootcamp) => (
        <option key={bootcamp.id} value={bootcamp.id}>
          {bootcamp.name}
        </option>
      ))}
    </select>
  );
}
