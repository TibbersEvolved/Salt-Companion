import { CardUpdateData } from "./types";

const PUT_URL =
  "https://salt-companion-backend-876198057788.us-central1.run.app/api/topic/cards";

export const UpdateCardsFetch = async (
  body: CardUpdateData[]
): Promise<string> => {
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
