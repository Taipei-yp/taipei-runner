import { AuthAction } from "./auth-actions";
import { AuthStages } from "./auth-stages";
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

type AuthStatus = "NO_AUTH" | "AUTH";

export type AuthState = {
  status: AuthStatus;
  stage: AuthStages;
  error?: string;
};

const AUTH_LS_KEY = "taipei-auth";
// TODO change after auth completed
// const savedAuthStatus = localStorage.getItem(AUTH_LS_KEY) as AuthStatus | null;
const savedAuthStatus = "AUTH";

export const initialState: AuthState = {
  status: savedAuthStatus || "NO_AUTH",
  stage: AuthStages.INIT,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        stage: AuthStages.INIT,
      };

    case SIGNING_UP:
      return {
        ...state,
        stage: AuthStages.SIGNING_UP,
      };

    case SIGNED_UP:
      localStorage.setItem(AUTH_LS_KEY, "AUTH");
      return {
        ...state,
        stage: AuthStages.SIGNED_UP,
        status: "AUTH",
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        stage: AuthStages.SIGN_UP_FAILURE,
        error: action.payload.error,
      };

    case SIGNING_IN:
      return {
        ...state,
        stage: AuthStages.SIGNING_IN,
      };

    case SIGNED_IN:
      localStorage.setItem(AUTH_LS_KEY, "AUTH");
      return {
        ...state,
        stage: AuthStages.SIGNED_IN,
        status: "AUTH",
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        stage: AuthStages.SIGN_IN_FAILURE,
        error: action.payload.error,
      };

    case LOGGING_OUT:
      return {
        ...state,
        stage: AuthStages.LOGGING_OUT,
      };

    case LOGGED_OUT:
      localStorage.setItem(AUTH_LS_KEY, "NO_AUTH");
      return {
        ...state,
        stage: AuthStages.LOGGED_OUT,
        status: "NO_AUTH",
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        stage: AuthStages.LOGOUT_FAILURE,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
