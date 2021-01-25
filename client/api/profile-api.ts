import { User, UserProfile } from "client/models/user";
import { api } from "./api";

const authPath = `/auth`;
const userPath = `/user`;
const { client } = api();

const profileApi = () => {
  const getProfile = () => {
    return client.get<User>(`${authPath}/user`, { withCredentials: true });
  };

  const changeProfile = (profile: UserProfile) => {
    return client.put<User>(`${userPath}/profile`, profile, {
      withCredentials: true,
    });
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    return client.put<User>(
      `${userPath}/password`,
      { oldPassword, newPassword },
      {
        withCredentials: true,
      },
    );
  };

  const changeAvatar = (formData: FormData) => {
    return client.put(`${userPath}/profile/avatar`, formData, {
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  };

  return {
    getProfile,
    changeProfile,
    changePassword,
    changeAvatar,
  };
};

export { profileApi };
