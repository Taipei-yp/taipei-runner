import { User } from "client/models/user";
import {
  INIT,
  SIGN_IN_FAILURE,
  SIGN_UP_FAILURE,
  SIGNED_IN,
  SIGNED_UP,
  SIGNING_IN,
  SIGNING_UP,
  UserAction,
} from "./types";

export type UserState = {
  authStatus: `NO_AUTH` | `AUTH`;
  stage:
    | typeof INIT
    | typeof SIGNING_UP
    | typeof SIGNED_UP
    | typeof SIGN_UP_FAILURE
    | typeof SIGNING_IN
    | typeof SIGNED_IN
    | typeof SIGN_IN_FAILURE;
  user: User;
  error?: string;
};

const initialState: UserState = {
  authStatus: "NO_AUTH",
  user: {
    id: null,
    first_name: "",
    second_name: "",
    login: "",
    email: "",
    password: "",
    phone: "",
    display_name: "",
  },
  stage: INIT,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction,
) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        stage: INIT,
      };

    case SIGNING_UP:
      return {
        ...state,
        stage: SIGNING_UP,
      };

    case SIGNED_UP:
      return {
        ...state,
        stage: SIGNED_UP,
        authStatus: "AUTH",
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        stage: SIGN_UP_FAILURE,
        error: action.payload.error,
      };

    case SIGNING_IN:
      return {
        ...state,
        stage: SIGNING_IN,
      };

    case SIGNED_IN:
      return {
        ...state,
        stage: SIGNED_IN,
        authStatus: "AUTH",
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        stage: SIGN_IN_FAILURE,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
