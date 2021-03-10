import axios from "axios";
import { environment } from "client/enviroment";
import { isServer } from "client/helpers/check-server";

const apiCookies = (() => {
  let cookieString: string | undefined;

  const set = (cookie: string | undefined) => {
    cookieString = cookie;
  };
  const get = (): string | undefined => cookieString;

  return {
    get,
    set,
  };
})();

const api = (localApi = false) => {
  const client = axios.create({
    baseURL: localApi ? environment.localApiUrl : environment.apiUrl,
    timeout: 5000,
  });

  client.interceptors.request.use(config => {
    const cookies = apiCookies.get();
    if (cookies !== undefined && isServer) {
      // eslint-disable-next-line no-param-reassign
      config.headers = { ...config.headers, Cookie: cookies };
    }
    if (process.env.NODE_ENV !== "development") {
      console.log(config.baseURL);
      console.log(config.headers);
    }
    return config;
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
      console.log(JSON.stringify(error));
      return Promise.reject(errorResponse);
    },
  );
  return { client };
};

export { api, apiCookies };
