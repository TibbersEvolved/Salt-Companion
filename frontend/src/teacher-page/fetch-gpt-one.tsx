import { BootCampPostData } from "./types";
import { base_url } from "../services/api";
import { Card } from "./types";

const POST_URL = `${base_url}/gpt/flashcard?topicId=`;

export const GptOneCardFetch = async (
  body: string,
  topicId: number
): Promise<Card[]> => {
  try {
    // const requestBody = JSON.stringify(body);
    console.log("body in fetch", body);
    console.log("topicId in fetch", topicId);
    console.log("POST_URL in fetch", POST_URL + topicId);

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
