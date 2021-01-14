import { useState } from "react";
import { authApi } from "client/api";
import { SignInUser, SignUpUser } from "client/models/user";

type SuccessCallback = () => void;
type FailureCallback = (error: string) => void;

type Auth = {
  stage:
    | "init"
    | "signing-up"
    | "signed-up"
    | "signing-in"
    | "signed-in"
    | "error";
  error?: string;
};

const { signUp: signUpApi, signIn: signInAPi } = authApi();

const useAuthService = () => {
  const [auth, setAuth] = useState<Auth>({ stage: "init" });

  const signUp = (
    user: SignUpUser,
    onSuccess: SuccessCallback = () => {},
    onFailure: FailureCallback = () => {},
  ) => {
    setAuth({ stage: "signing-up" });
    signUpApi(user)
      .then(() => {
        setAuth({
          stage: "signed-up",
        });
        onSuccess();
      })
      .catch(error => {
        setAuth({ stage: "error", error });
        onFailure(error);
      });
  };

  const signIn = (
    user: SignInUser,
    onSuccess: SuccessCallback = () => {},
    onFailure: FailureCallback = () => {},
  ) => {
    setAuth({ stage: "signing-in" });
    signInAPi(user)
      .then(() => {
        setAuth({
          stage: "signed-in",
        });
        onSuccess();
      })
      .catch(error => {
        setAuth({ stage: "error", error });
        onFailure(error);
      });
  };

  const reset = () => {
    setAuth({ stage: "init" });
  };

  return {
    auth,
    reset,
    signUp,
    signIn,
  };
};

export { useAuthService };
