import { TeacherBootCampList } from "./types";
import { Card } from "./types";

const GET_URL =
  "https://salt-companion-backend-876198057788.us-central1.run.app/api/topic/card/";

export const FetchTopicCards = async (topicId: number): Promise<Card[]> => {
  try {
    const response = await fetch(GET_URL + topicId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch topic cards. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching topic cards: ", error);
    throw error;
  }
};
