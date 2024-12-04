import { TeacherBootCampList } from "./types";
import { base_url } from "../services/api";

const POST_URL = `${base_url}/teachers/bootcamps/`;

export const FetchTeacherBootCamps = async (
  teacherClerkId: string
): Promise<TeacherBootCampList> => {
  try {
    const response = await fetch(POST_URL + teacherClerkId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch teacher bootcamps. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching teacher bootcamps: ", error);
    throw error;
  }
};
