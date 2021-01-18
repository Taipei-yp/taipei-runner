import { useCallback, useState } from "react";
import { authApi } from "client/api";
import { SignInUser, SignUpUser } from "client/models/user";
import { Auth, AuthStages, FailureCallback, SuccessCallback } from "./types";

const { signUp: signUpApi, signIn: signInAPi } = authApi();

const useAuthService = () => {
  const [auth, setAuth] = useState<Auth>({ stage: AuthStages.INIT });

  const signUp = useCallback(
    (
      user: SignUpUser,
      onSuccess: SuccessCallback = () => {},
      onFailure: FailureCallback = () => {},
    ) => {
      setAuth({ stage: AuthStages.SIGNING_UP });
      signUpApi(user)
        .then(() => {
          setAuth({
            stage: AuthStages.SIGNED_UP,
          });
          onSuccess();
        })
        .catch(error => {
          setAuth({ stage: AuthStages.ERROR, error });
          onFailure(error);
        });
    },
    [],
  );

  const signIn = useCallback(
    (
      user: SignInUser,
      onSuccess: SuccessCallback = () => {},
      onFailure: FailureCallback = () => {},
    ) => {
      setAuth({ stage: AuthStages.SIGNING_IN });
      signInAPi(user)
        .then(() => {
          setAuth({
            stage: AuthStages.SIGNED_IN,
          });
          onSuccess();
        })
        .catch(error => {
          setAuth({ stage: AuthStages.ERROR, error });
          onFailure(error);
        });
    },
    [],
  );

  const reset = useCallback(() => {
    setAuth({ stage: AuthStages.INIT });
  }, []);

  return {
    auth,
    reset,
    signUp,
    signIn,
  };
};

export { useAuthService };
