import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Theme } from "client/models/theme";
import { Api } from "client/redux/store";
import {
  THEME_LIST_FAILURE,
  THEME_LIST_LOADED,
  THEME_NOW_FAILURE,
  THEME_NOW_LOADED,
  THEME_NOW_SAVE_FAILURE,
  THEME_NOW_SAVED,
} from "./types";

type ThemeListLoaded = {
  type: typeof THEME_LIST_LOADED;
  payload: { list: Theme[] };
};
type ThemeListFailure = {
  type: typeof THEME_LIST_FAILURE;
  payload: { error: string };
};
type ThemeNowLoaded = {
  type: typeof THEME_NOW_LOADED;
  payload: { theme: Theme };
};
type ThemeNowFailure = {
  type: typeof THEME_NOW_FAILURE;
  payload: { error: string };
};
type ThemeNowSaved = {
  type: typeof THEME_NOW_SAVED;
};
type ThemeNowSaveFailure = {
  type: typeof THEME_NOW_SAVE_FAILURE;
  payload: { error: string };
};

export const themeListLoaded = (list: Theme[]): ThemeListLoaded => {
  return {
    type: THEME_LIST_LOADED,
    payload: { list },
  };
};

export const themeListFailure = (error: string): ThemeListFailure => {
  return {
    type: THEME_LIST_FAILURE,
    payload: { error },
  };
};
export const themeNowLoaded = (theme: Theme): ThemeNowLoaded => {
  return {
    type: THEME_NOW_LOADED,
    payload: { theme },
  };
};
export const themeNowFailure = (error: string): ThemeNowFailure => {
  return {
    type: THEME_NOW_FAILURE,
    payload: { error },
  };
};
export const themeNowSaved = (): ThemeNowSaved => {
  return {
    type: THEME_NOW_SAVED,
  };
};
export const themeNowSaveFailure = (error: string): ThemeNowSaveFailure => {
  return {
    type: THEME_NOW_SAVE_FAILURE,
    payload: { error },
  };
};

export const loadThemesList = (): ThunkAction<
  void,
  unknown,
  Api,
  AnyAction
> => async (dispatch, _state, api) => {
  const { themesList } = api.themeApi();
  try {
    const response = await themesList();
    dispatch(themeListLoaded(response.data));
  } catch (error) {
    dispatch(themeListFailure(error));
  }
};

export const loadUserTheme = (): ThunkAction<
  void,
  unknown,
  Api,
  AnyAction
> => async (dispatch, _state, api) => {
  const { userTheme } = api.themeApi();
  try {
    const response = await userTheme();
    dispatch(themeNowLoaded(response.data));
  } catch (error) {
    dispatch(themeNowFailure(error));
  }
};

export const updateTheme = (
  theme: Theme,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(themeNowLoaded(theme));
  const { updateUserTheme } = api.themeApi();
  try {
    await updateUserTheme(theme);
    dispatch(themeNowSaved());
  } catch (error) {
    dispatch(themeNowSaveFailure(error));
  }
};

export type ThemeAction =
  | ThemeListLoaded
  | ThemeListFailure
  | ThemeNowLoaded
  | ThemeNowFailure
  | ThemeNowSaved
  | ThemeNowSaveFailure;
