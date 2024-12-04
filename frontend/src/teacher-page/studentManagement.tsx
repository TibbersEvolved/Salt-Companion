import { useEffect, useState } from "react";
import { base_url } from "../services/api";
import { Student } from "./types";
import LoadingScreen from "../services/loadingScreen";

export const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${base_url}/students/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch students. Status: ${response.status}`);
      }

      const data: Student[] = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to fetch students.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!error && students.length === 0 && (
        <LoadingScreen displayText="Loading.." />
      )}
      {!error && students.length > 0 && (
        <ul className="list-disc pl-5">
          {students.map((student) => (
            <li key={student.clerkId}>
              <p>
                <strong>Name:</strong> {student.name}
              </p>
              <p>
                <strong>Bootcamp:</strong> {student.bootcamp} (ID:{" "}
                {student.bootCampId})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
