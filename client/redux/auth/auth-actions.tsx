import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { OauthCode } from "client/models/oauth";
import { SignInUser, SignUpUser } from "client/models/user";
import { Api } from "client/redux/store";
import {
  INIT,
  LOGGED_OUT,
  LOGGING_OUT,
  LOGOUT_FAILURE,
  SIGN_IN_FAILURE,
  SIGN_UP_FAILURE,
  SIGNED_IN,
  SIGNED_UP,
  SIGNING_IN,
  SIGNING_UP,
} from "./types";

type Init = {
  type: typeof INIT;
};

type SigningUp = {
  type: typeof SIGNING_UP;
};

type SignedUp = {
  type: typeof SIGNED_UP;
};

type SignUpFailure = {
  type: typeof SIGN_UP_FAILURE;
  payload: { error: string };
};

type SigningIn = {
  type: typeof SIGNING_IN;
};

type SignedIn = {
  type: typeof SIGNED_IN;
};

type SignInFailure = {
  type: typeof SIGN_IN_FAILURE;
  payload: { error: string };
};

type LoggingOut = {
  type: typeof LOGGING_OUT;
};

type LoggedOut = {
  type: typeof LOGGED_OUT;
};

type LogoutFailure = {
  type: typeof LOGOUT_FAILURE;
  payload: { error: string };
};

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

export const loggingOut = (): LoggingOut => {
  return {
    type: LOGGING_OUT,
  };
};

export const loggedOut = (): LoggedOut => {
  return {
    type: LOGGED_OUT,
  };
};

export const logoutFailure = (error: string): LogoutFailure => {
  return {
    type: LOGOUT_FAILURE,
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
  const { signUp: signUpApi } = api.authApi();
  try {
    await signUpApi(user);
    dispatch(signedUp());
  } catch (error) {
    dispatch(signUpFailure(error));
  }
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

export const logout = (): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(loggingOut());
  const { logout: logoutApi } = api.authApi();
  try {
    await logoutApi();
    dispatch(loggedOut());
  } catch (error) {
    dispatch(logoutFailure(error));
  }
};

export const oauthSingIn = (
  code: OauthCode,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  const { signIn: signInApi } = api.oauthApi();
  try {
    await signInApi(code);
    dispatch(signedIn());
  } catch (error) {
    dispatch(signInFailure(error));
  }
};

export type AuthAction =
  | Init
  | SignedUp
  | SigningUp
  | SignUpFailure
  | SigningIn
  | SignedIn
  | SignInFailure
  | LoggingOut
  | LoggedOut
  | LogoutFailure;
