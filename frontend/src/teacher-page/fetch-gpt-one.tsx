import { BootCampPostData } from "./types";
import { base_url } from "../services/api";
import { Card } from "./types";

const POST_URL = `${base_url}/gpt/flashcard?topicName=`;

export const GptOneCardFetch = async (
  body: Card[],
  topicId: number
): Promise<Card[]> => {
  try {
    const response = await fetch(POST_URL + topicId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch GPT one card. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GPT one card:", error);
    throw error;
  }
};
