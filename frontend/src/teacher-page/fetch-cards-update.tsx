import { Card } from "./types";
import { base_url } from "../services/api";

const PUT_URL = `${base_url}/topic/cards`;

export const UpdateCardsFetch = async (body: Card[]): Promise<string> => {
  try {
    const response = await fetch(PUT_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update cards. Status: ${response.status}`);
    }
    return "Cards updated in database";
  } catch (error) {
    console.error("Error updating cards:", error);
    throw error;
  }
};
