import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

export const getFlashcardQuestions = async () => {
  try {
    const response = await axios.get(`${base_url}/topic`);
    return response.data;
  } catch (error) {
    console.log("Error fetching flashcard questions. Please try again later");
  }
};

export const getQuizQuestions = async () => {
  try {
    const response = await axios.get(`${base_url}/${"SOME_ENDPOINT"}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching quiz questions. Please try again later");
  }
};
