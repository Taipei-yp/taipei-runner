import axios from "axios";

const api = () => {
  const client = axios.create();
  client.interceptors.response.use(
    res => res,
    error => {
      let errorResponse;
      if (error.response) {
        errorResponse = Object.prototype.hasOwnProperty.call(
          error.response.data,
          "reason",
        )
          ? error.response.data.reason
          : `Server sent status: ${error.response.status}`;
      } else if (error.request) {
        errorResponse = "Unknown error";
      } else if (error.message) {
        errorResponse = error.message;
      } else {
        errorResponse = error.config;
      }
      return Promise.reject(errorResponse);
    },
  );
  return { client };
};

export { api };
