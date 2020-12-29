import { useState } from "react";
import { Environment } from "../../enviroment";
import { SignInUser, SignUpUser, User } from "../../types/user";
import { api } from "../api";

type Auth = {
  status:
    | "init"
    | "signing-up"
    | "signed-up"
    | "signing-in"
    | "signed-in"
    | "error";
  error?: string;
};

const baseUrl = `${Environment.apiUrl}/auth`;
const { client } = api();

const useAuthService = () => {
  const [auth, setAuth] = useState<Auth>({ status: "init" });

  const signUp = (user: SignUpUser) => {
    setAuth({ status: "signing-up" });
    return new Promise((resolve, reject) => {
      return client
        .post<User>(`${baseUrl}/signup`, user, { withCredentials: true })
        .then(() => {
          setAuth({
            status: "signed-up",
          });
          resolve("signed-up");
        })
        .catch(error => {
          setAuth({ status: "error", error });
          reject(error);
        });
    });
  };

  const signIn = (user: SignInUser) => {
    setAuth({ status: "signing-in" });
    return new Promise((resolve, reject) => {
      return client
        .post<User>(`${baseUrl}/signIn`, user, { withCredentials: true })
        .then(() => {
          setAuth({
            status: "signed-in",
          });
          resolve("signed-in");
        })
        .catch(error => {
          setAuth({ status: "error", error });
          reject(error);
        });
    });
  };

  const reset = () => {
    setAuth({ status: "init" });
  };

  return {
    auth,
    reset,
    signUp,
    signIn,
  };
};

export { useAuthService };
