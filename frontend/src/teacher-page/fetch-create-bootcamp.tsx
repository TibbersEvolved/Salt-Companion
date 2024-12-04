import { BootCampPostData } from "./types";
import { base_url } from "../services/api";

const POST_URL = `${base_url}/bootcamps`;

export const CreateBootCampFetch = async (
  body: BootCampPostData
): Promise<string> => {
  console.log("bootcamp data in fetch", body);
  try {
    const response = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create bootcamp. Status: ${response.status}`);
    }
    return "Bootcamp added to database";
    // return await response.json();
  } catch (error) {
    console.error("Error creating bootcamp:", error);
    throw error;
  }
};
