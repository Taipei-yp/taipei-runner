import { api } from "client/api/api";
import { FeedbackMessage } from "client/models/feedback-message";

const feedbackPath = `/feedback`;
const { client } = api(true);

const feedbackApi = () => {
  const sendFeedback = (message: FeedbackMessage) => {
    return client
      .post<FeedbackMessage>(`${feedbackPath}`, message, {
        withCredentials: true,
      })
      .then(resp => resp.data);
  };

  return {
    sendFeedback,
  };
};

export { feedbackApi };
