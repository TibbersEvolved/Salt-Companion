import { base_url } from "../services/api";
import { Student } from "./types";

const GET_URL = `${base_url}/bootcamps/student/unlisted`;

export const getUnlistedStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch(GET_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch unlisted students. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching unlisted students: ", error);
    throw error;
  }
};
