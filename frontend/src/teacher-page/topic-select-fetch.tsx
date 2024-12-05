import { TopicList } from "./types";
import { base_url } from "../services/api";

const GET_URL = `${base_url}/bootcamps/topic/`;

export async function topicFetcher(bootCampId: number): Promise<TopicList> {
  if (bootCampId === 0) {
    return { topics: [] };
  } else {
    try {
      const response = await fetch(GET_URL + bootCampId);

      if (!response.ok) {
        throw new Error("Could not fetch topics");
      }

      const result: TopicList = await response.json();

      return result;
    } catch (error) {
      console.error("Could not fetch topics", error);
      throw error;
    }
  }
}
