import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { addStudentToBootcamp } from "./types";
import { addStudent } from "./fetch-student-add";

export default function AddStudentButton() {
  const [clerkId, setClerkId] = useState<string>("");
  const [bootcampId, setBootcampId] = useState<number>(0);

  const mutationAddStudent: UseMutationResult<
    string,
    Error,
    addStudentToBootcamp
  > = useMutation({
    mutationFn: async (studentData: addStudentToBootcamp): Promise<string> => {
      if (!studentData) {
        throw new Error("No student data provided");
      }

      return await addStudent(studentData);
    },
    onSuccess: (data: string) => {
      console.log("Student added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding student:", error);
    },
  });

  const handleAddStudent = () => {
    mutationAddStudent.mutate({ clerkId, bootcampId });
  };

  return (
    <div>
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
}
