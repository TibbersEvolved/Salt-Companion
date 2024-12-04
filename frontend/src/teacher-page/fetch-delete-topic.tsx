import { TeacherBootCampList } from "./types";
import { Card } from "./types";
import { base_url } from "../services/api";

const DELETE_URL = `${base_url}/bootcamps/topic/delete/`;

export const DeleteTopicCard = async (topicId: number): Promise<string> => {
  try {
    const response = await fetch(DELETE_URL + topicId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete topic. Status: ${response.status}`);
    }
    // await response.json();
    return "Topic deleted from database";
  } catch (error) {
    console.error("Error deleting topic: ", error);
    throw error;
  }
};
