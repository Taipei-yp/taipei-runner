import { OauthCode, ServiceId } from "client/models/oauth";
import { api } from "./api";

const path = `/oauth/yandex/`;
const { client } = api();

const oauthApi = () => {
  const signIn = (code: OauthCode) => {
    return client.post(`${path}`, code, { withCredentials: true });
  };
  const clientId = () => {
    return client.get<ServiceId>(`${path}/service-id`, {
      withCredentials: true,
    });
  };

  return {
    signIn,
    clientId,
  };
};

export { oauthApi };
