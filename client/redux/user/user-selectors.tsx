import { RootState } from "client/redux/root-reducer";

export const authSelector = (state: RootState) =>
  state.user.authStatus === `AUTH`;

export const stageSelector = (state: RootState) => state.user.stage;

export const errorSelector = (state: RootState) => state.user.error;
