import axios from "axios";

export const base_url = import.meta.env.VITE_BASE_URL;

export const startFlashcardSession = async (
  cards: number,
  topicIdList: number[],
  userId: string
) => {
  const payload = {
    cards,
    topicIdList,
    userId,
  };
  try {
    const response = await axios.post(`${base_url}/flashSession`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching flashcard questions. Please try again later");
  }
};

export const getQuizQuestions = async () => {
  try {
    const response = await axios.get(`${base_url}/bootcamps`);
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz questions. Please try again later");
  }
};

export const getStudentData = async (id: string) => {
  try {
    const response = await axios.get(`${base_url}/students/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz questions. Please try again later");
  }
};

export const fetchBootcamps = async () => {
  const payload = {
    name: "Sabine",
    clerkId: "test",
  };
  try {
    const response = fetch(`${base_url}/bootcamps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.log("Error fetching bootcamps. Please try again later");
  }
};

export const getFlashcardQuestions = async (id: string) => {
  try {
    const response = await axios.get(`${base_url}/flashSession/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz questions. Please try again later");
  }
};
