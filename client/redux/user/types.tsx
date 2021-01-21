export const INIT = "init";

export const SIGNING_UP = "signing-up";
export const SIGNED_UP = "signed-up";
export const SIGN_UP_FAILURE = "sign-up-failure";

export const SIGNING_IN = "signing-in";
export const SIGNED_IN = "signed-in";
export const SIGN_IN_FAILURE = "sign-in-failure";

export type Init = {
  type: typeof INIT;
};

export type SigningUp = {
  type: typeof SIGNING_UP;
};

export type SignedUp = {
  type: typeof SIGNED_UP;
};

export type SignUpFailure = {
  type: typeof SIGN_UP_FAILURE;
  payload: { error: string };
};

export type SigningIn = {
  type: typeof SIGNING_IN;
};

export type SignedIn = {
  type: typeof SIGNED_IN;
};

export type SignInFailure = {
  type: typeof SIGN_IN_FAILURE;
  payload: { error: string };
};

export type UserAction =
  | Init
  | SignedUp
  | SigningUp
  | SignUpFailure
  | SigningIn
  | SignedIn
  | SignInFailure;
