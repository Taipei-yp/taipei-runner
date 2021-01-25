import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { environment } from "client//enviroment";
import { User, UserProfile } from "client/models/user";
import { Api } from "client/redux/store";
import {
  PROFILE_FAILURE,
  PROFILE_INIT,
  PROFILE_LOADED,
  PROFILE_LOADING,
} from "./types";

type ProfileInit = {
  type: typeof PROFILE_INIT;
};

type ProfileLoading = {
  type: typeof PROFILE_LOADING;
};

type ProfileLoaded = {
  type: typeof PROFILE_LOADED;
  payload: { user: User | null };
};

type ProfileFailure = {
  type: typeof PROFILE_FAILURE;
  payload: { error: string };
};

const makeUserWithRightAvatarPath = (user: User) => {
  return {
    ...user,
    avatar: user.avatar ? environment.uploadsUrl + user.avatar : null,
  };
};

export const profileInit = (): ProfileInit => {
  return {
    type: PROFILE_INIT,
  };
};

export const profileLoading = (): ProfileLoading => {
  return {
    type: PROFILE_LOADING,
  };
};

export const profileLoaded = (user: User): ProfileLoaded => {
  return {
    type: PROFILE_LOADED,
    payload: { user },
  };
};

export const profileLoadingFailure = (error: string): ProfileFailure => {
  return {
    type: PROFILE_FAILURE,
    payload: { error },
  };
};

export const loadProfile = (): ThunkAction<
  void,
  unknown,
  Api,
  AnyAction
> => async (dispatch, _state, api) => {
  dispatch(profileLoading());

  const { getProfile } = api.profileApi();
  try {
    const profileResponse = await getProfile();
    dispatch(profileLoaded(makeUserWithRightAvatarPath(profileResponse.data)));
  } catch (error) {
    dispatch(profileLoadingFailure(error));
  }
};

export const changeProfile = (
  profile: UserProfile,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(profileLoading());

  const { changeProfile: changeProfileApi } = api.profileApi();
  try {
    const profileResponse = await changeProfileApi(profile);
    dispatch(profileLoaded(makeUserWithRightAvatarPath(profileResponse.data)));
  } catch (error) {
    dispatch(profileLoadingFailure(error));
  }
};

export const changePassword = (
  user: User,
  oldPassword: string,
  newPassword: string,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(profileLoading());

  const { changePassword: changePasswordApi } = api.profileApi();
  try {
    await changePasswordApi(oldPassword, newPassword);
    dispatch(profileLoaded(user));
  } catch (error) {
    dispatch(profileLoadingFailure(error));
  }
};

export const changeAvatar = (
  formData: FormData,
): ThunkAction<void, unknown, Api, AnyAction> => async (
  dispatch,
  _state,
  api,
) => {
  dispatch(profileLoading());

  const { changeAvatar: changeAvatarApi } = api.profileApi();
  try {
    const response = await changeAvatarApi(formData);
    dispatch(profileLoaded(makeUserWithRightAvatarPath(response.data)));
  } catch (error) {
    dispatch(profileLoadingFailure(error));
  }
};

export type ProfileAction =
  | ProfileInit
  | ProfileFailure
  | ProfileLoading
  | ProfileLoaded;
