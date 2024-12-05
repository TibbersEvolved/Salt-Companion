import { addStudentToBootcamp } from "./types";
import { base_url } from "../services/api";

const POST_URL = `${base_url}/bootcamps/student/add`;

export const addStudent = async (
  body: addStudentToBootcamp
): Promise<string> => {
  try {
    const response = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add student to bootcamp. Status: ${response.status}`
      );
    }
    return "Student added to bootcamp";
  } catch (error) {
    console.error("Error adding student to bootcamp:", error);
    throw error;
  }
};
