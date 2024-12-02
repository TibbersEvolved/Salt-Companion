import { TeacherBootCampList } from "./types";

const POST_URL =
  "https://salt-companion-backend-876198057788.us-central1.run.app/api/teachers/bootcamps/";

export const FetchTeacherBootCamps = async (
  teacherClerkId: string
): Promise<TeacherBootCampList> => {
  try {
    const response = await fetch(POST_URL + teacherClerkId, {
      method: "POST",
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
