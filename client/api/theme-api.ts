import { Theme, UserThemeResponce } from "client/models/theme";
import { api } from "./api";

const path = `/theme`;

const themeApi = () => {
  const { client } = api(true);

  const themesList = () => {
    return client.get<Theme[]>(`${path}/`, { withCredentials: true });
  };

  const userTheme = () => {
    return client.get<UserThemeResponce>(`${path}/user`, {
      withCredentials: true,
    });
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
