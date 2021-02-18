import { User } from "client/models/user";
import { ProfileAction } from "./profile-actions";
import { ProfileStages } from "./profile-stages";
import {
  PROFILE_FAILURE,
  PROFILE_INIT,
  PROFILE_LOADED,
  PROFILE_LOADING,
} from "./types";

export type ProfileState = {
  stage: ProfileStages;
  user: User | null;
  error?: string;
};

export const initialState: ProfileState = {
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
  stage: ProfileStages.INIT,
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case PROFILE_INIT:
      return {
        ...state,
        stage: ProfileStages.INIT,
      };

    case PROFILE_FAILURE:
      return {
        ...state,
        stage: ProfileStages.FAILURE,
        error: action.payload.error,
      };

    case PROFILE_LOADING:
      return {
        ...state,
        stage: ProfileStages.LOADING,
      };

    case PROFILE_LOADED:
      return {
        ...state,
        stage: ProfileStages.LOADED,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
