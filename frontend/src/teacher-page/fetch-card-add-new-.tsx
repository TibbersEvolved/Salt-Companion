import { Card, CardNewData } from "./types";
import { base_url } from "../services/api";

// const POST_URL = `${base_url}/topic/cards`;
const POST_URL =
  "https://saltcompanionchilis-876198057788.europe-north1.run.app/api/topic/cards";

export const CreateCardsFetch = async (
  body: CardNewData[]
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
      throw new Error(`Failed to create new cards. Status: ${response.status}`);
    }
    return "Cards created in database";
  } catch (error) {
    console.error("Error creating cards:", error);
    throw error;
  }
};
