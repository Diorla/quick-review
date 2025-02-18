import { apiUrl } from "../fetchSurvey/apiUrl";
import FeedbackData from "./FeedbackData";

export default async function postReview(data: FeedbackData) {
  try {
    const response = await fetch(`${apiUrl}/send_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return { success: response.ok };
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return { success: false };
  }
}
