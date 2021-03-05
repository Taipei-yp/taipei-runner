import { Theme } from "client/models/theme";
import { ThemeAction } from "./theme-actions";
import {
  THEME_LIST_FAILURE,
  THEME_LIST_LOADED,
  THEME_NOW_FAILURE,
  THEME_NOW_LOADED,
  THEME_NOW_SAVE_FAILURE,
  THEME_NOW_SAVED,
} from "./types";

export type ThemeState = {
  list: Theme[];
  now: Theme;
  error_list?: string;
  error_now?: string;
};

export const initialState: ThemeState = {
  list: [],
  now: { id: 99999, theme: "default" },
};

export const themeReducer = (
  state: ThemeState = initialState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case THEME_LIST_FAILURE:
      return {
        ...state,
        error_list: action.payload.error,
      };

    case THEME_LIST_LOADED:
      return {
        ...state,
        list: action.payload.list,
      };

    case THEME_NOW_FAILURE:
      return {
        ...state,
        error_now: action.payload.error,
      };

    case THEME_NOW_LOADED:
      return {
        ...state,
        now: action.payload.theme,
      };

    case THEME_NOW_SAVE_FAILURE:
      return {
        ...state,
        error_now: action.payload.error,
      };

    case THEME_NOW_SAVED:
      return {
        ...state,
        error_now: "",
      };
    default:
      return state;
  }
};
