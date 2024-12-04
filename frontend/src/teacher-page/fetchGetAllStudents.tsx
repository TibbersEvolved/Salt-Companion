import { Student } from "./types";
import { base_url } from "../services/api";

export const GetAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch(base_url + "students/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students. Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching students: ", error);
    throw error;
  }
};
