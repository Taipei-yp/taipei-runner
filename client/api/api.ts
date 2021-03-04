import axios from "axios";
import { environment } from "client/enviroment";

const api = (localApi = false) => {
  const client = axios.create({
    baseURL: localApi ? environment.localApiUrl : environment.apiUrl,
    timeout: 5000,
  });
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
      } else {
        errorResponse = "Unknown error";
      }
      return Promise.reject(errorResponse);
    },
  );
  return { client };
};

export { api };
