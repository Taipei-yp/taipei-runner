import { SignInUser, SignUpUser, User } from "../../models/user";
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

  return {
    signUp,
    signIn,
  };
};

export { authApi };
