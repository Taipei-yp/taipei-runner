import { createSelector } from "reselect";
import { Theme } from "client/models/theme";
import { RootState } from "client/redux/root-reducer";

export const authSelector = createSelector(
  [
    (state: RootState) => state.theme.list,
    (state: RootState) => state.theme.now,
    (state: RootState) => state.theme.error_list,
    (state: RootState) => state.theme.error_now,
  ],
  (
    list: Theme[],
    now: Theme,
    error_list: string | undefined,
    error_now: string | undefined,
  ) => {
    return { list, now, error_list, error_now };
  },
);
