import { Theme } from "client/models/theme";
import { api } from "./api";

const path = `/theme`;
const { client } = api(true);

const themeApi = () => {
  const themesList = () => {
    return client.get<Theme[]>(`${path}/`, { withCredentials: true });
  };

  const userTheme = () => {
    return client.get<Theme>(`${path}/user`, { withCredentials: true });
  };

  const updateUserTheme = (theme: Theme) => {
    return client.post(`${path}/user/${theme.id}`, { withCredentials: true });
  };

  return {
    themesList,
    userTheme,
    updateUserTheme,
  };
};

export { themeApi };
