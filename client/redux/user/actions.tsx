import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { SignInUser, SignUpUser } from "client/models/user";
import { Api } from "client/redux/store";
import {
  INIT,
  Init,
  SIGN_IN_FAILURE,
  SIGN_UP_FAILURE,
  SIGNED_IN,
  SIGNED_UP,
  SignedIn,
  SignedUp,
  SignInFailure,
  SIGNING_IN,
  SIGNING_UP,
  SigningIn,
  SigningUp,
  SignUpFailure,
} from "./types";

export const init = (): Init => {
  return {
    type: INIT,
  };
};

export const signingUp = (): SigningUp => {
  return {
    type: SIGNING_UP,
  };
};

export const signedUp = (): SignedUp => {
  return {
    type: SIGNED_UP,
  };
};

export const signUpFailure = (error: string): SignUpFailure => {
  return {
    type: SIGN_UP_FAILURE,
    payload: { error },
  };
};

export const signUp = (
  user: SignUpUser,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(signingUp());
  const { signIn: signInApi } = api.authApi();
  try {
    await signInApi(user);
    dispatch(signedUp());
  } catch (error) {
    dispatch(signUpFailure(error));
  }
};

export const signingIn = (): SigningIn => {
  return {
    type: SIGNING_IN,
  };
};

export const signedIn = (): SignedIn => {
  return {
    type: SIGNED_IN,
  };
};

export const signInFailure = (error: string): SignInFailure => {
  return {
    type: SIGN_IN_FAILURE,
    payload: { error },
  };
};

export const signIn = (
  user: SignInUser,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(signingIn());
  const { signIn: signInApi } = api.authApi();
  try {
    await signInApi(user);
    dispatch(signedIn());
  } catch (error) {
    dispatch(signInFailure(error));
  }
};
