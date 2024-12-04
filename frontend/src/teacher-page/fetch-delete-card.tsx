import { TeacherBootCampList } from "./types";
import { Card } from "./types";
import { base_url } from "../services/api";

const GET_URL = `${base_url}/topic/card/`;

export const DeleteTopicCard = async (cardId: number): Promise<string> => {
  try {
    const response = await fetch(GET_URL + cardId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete card. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting card: ", error);
    throw error;
  }
};
