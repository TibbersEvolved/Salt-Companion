import { TopicList } from "./types";

export async function topicFetcher(bootCampId: number): Promise<TopicList> {
  try {
    const response = await fetch(
      `https://salt-companion-backend-876198057788.us-central1.run.app/api/bootcamps/topic/${bootCampId}`
    );

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
