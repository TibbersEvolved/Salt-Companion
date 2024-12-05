import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { addStudentToBootcamp } from "./types";
import { addStudent } from "./fetch-student-add";

export default function AddStudentButton() {
  const [clerkId, setClerkId] = useState<string>("");
  const [bootcampId, setBootcampId] = useState<number>(0);
  const [showNewStudents, setShowNewStudents] = useState<boolean>(false);

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
    <>
      <button onClick={() => setShowNewStudents(true)}>Add Student</button>
      {showNewStudents && (
        <div className="fixed top-0 left-0 w-full h-600 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6 ">
            <h1>Add Student</h1>
            <p>here is a list of unassigned students</p>
            <button
              className="ml-5  text-blue-500 hover:text-blue-700"
              type="submit"
            >
              Add
            </button>

            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
              onClick={() => setShowNewStudents(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
