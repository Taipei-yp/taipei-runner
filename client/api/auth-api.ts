import { SignInUser, SignUpUser, User } from "client/models/user";
import { api } from "./api";

const path = `/auth`;
const { client } = api();

const authApi = () => {
  const signUp = (user: SignUpUser) => {
    return client.post<User>(`${path}/signup`, user, { withCredentials: true });
  };

  const signIn = (user: SignInUser) => {
    return client.post<User>(`${path}/signIn`, user, { withCredentials: true });
  };

  const logout = () => {
    return client.post(`${path}/logout`, {}, { withCredentials: true });
  };

  return {
    signUp,
    signIn,
    logout,
  };
};

export { authApi };
