import { api } from "client/api/api";
import { FeedbackMessage } from "client/models/feedback-message";

const feedbackPath = `/feedback`;
const { client } = api(true);

const feedbackApi = () => {
  const sendFeedback = (message: FeedbackMessage) => {
    return client.post(`${feedbackPath}`, message, { withCredentials: true });
  };

  return {
    sendFeedback,
  };
};

export { feedbackApi };
