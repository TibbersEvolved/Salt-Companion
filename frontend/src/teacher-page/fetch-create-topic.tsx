import { Topic, TopicPostData } from "./types";
import { base_url } from "../services/api";

const POST_URL = `${base_url}/bootcamps/topic/add`;

export const CreateTopicFetch = async (
  body: TopicPostData
): Promise<string> => {
  console.log("topic data in fetch", body);
  try {
    const response = await fetch(POST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create Topic. Status: ${response.status}`);
    }
    return "Bootcamp added to database";
    // return await response.json();
  } catch (error) {
    console.error("Error creating topic:", error);
    throw error;
  }
};
