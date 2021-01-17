export enum AuthStages {
  INIT = "init",
  SIGNING_UP = "signing-up",
  SIGNED_UP = "signed-up",
  SIGNING_IN = "signing-in",
  SIGNED_IN = "signed-in",
  ERROR = "error",
}

export type Auth = {
  stage: AuthStages;
  error?: string;
};

export type SuccessCallback = () => void;
export type FailureCallback = (error: string) => void;
