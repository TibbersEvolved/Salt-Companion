import { TeacherBootCampList } from "./types";
import { Card } from "./types";
import { base_url } from "../services/api";

const GET_URL = `${base_url}/topic/card/`;

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
