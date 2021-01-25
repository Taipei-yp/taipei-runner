import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import pencil from "client/assets/images/pencil.png";
import { Avatar } from "client/components/avatar";
import { Button } from "client/components/button";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { UserProfile } from "client/models/user";
import { logout } from "client/redux/auth/auth-actions";
import { authSelector } from "client/redux/auth/auth-selectors";
import { AuthStages } from "client/redux/auth/auth-stages";
import {
  changeAvatar,
  changePassword,
  changeProfile,
  loadProfile,
} from "client/redux/profile/profile-actions";
import { profileSelector } from "client/redux/profile/profile-selectors";
import { ProfileStages } from "client/redux/profile/profile-stages";

import "./profile.css";

const b = block("profile");

const UserFields: FormViewField[] = [
  {
    labelText: "First name",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "first_name",
  },
  {
    labelText: "Second name",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "second_name",
  },
  {
    labelText: "Login",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "login",
  },
  {
    labelText: "Display name",
    pattern: /^.{3,}$/,
    errorMessage: "The length of this field must be > 3 characters",
    type: "text",
    name: "display_name",
  },
  {
    labelText: "Email",
    // eslint-disable-next-line no-useless-escape,max-len
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: "Wrong format",
    type: "email",
    name: "email",
  },
  {
    labelText: "Phone",
    pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    errorMessage: "Wrong format. Example: 1234567899",
    type: "text",
    name: "phone",
  },
];

const PasswordFields: FormViewField[] = [
  {
    labelText: "Old password",
    pattern: /^.{6,}$/,
    errorMessage: "The length of this field must be > 6 characters",
    type: "password",
    name: "oldPassword",
  },
  {
    labelText: "New password",
    pattern: /^.{6,}$/,
    errorMessage: "The length of this field must be > 6 characters",
    type: "password",
    name: "newPassword",
  },
];

type Props = {
  className?: string;
};

const Profile: FC<Props> = ({ className = "" }) => {
  const {
    user: profileUser,
    error: profileError,
    stage: profileStage,
  } = useSelector(profileSelector);

  const { error: authError, stage: authStage } = useSelector(authSelector);

  const dispatch = useDispatch();

  const profileFormSubmit = useCallback(
    (formValue: UserProfile) => {
      dispatch(changeProfile(formValue));
    },
    [dispatch],
  );

  const onAvatarInputChange = useCallback(
    event => {
      const { target } = event;

      if (target && target.files && target.files.length > 0) {
        const formData = new FormData();
        formData.append("avatar", target.files[0]);
        dispatch(changeAvatar(formData));
      }
    },
    [dispatch],
  );

  const passwordFormSubmit = useCallback(
    ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => {
      dispatch(changePassword(profileUser, oldPassword, newPassword));
    },
    [profileUser, dispatch],
  );

  const logoutButtonClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  const userValues = useMemo(
    () => ({
      first_name: profileUser.first_name,
      second_name: profileUser.second_name,
      display_name: profileUser.display_name,
      login: profileUser.login,
      email: profileUser.email,
      phone: profileUser.phone,
    }),
    [profileUser],
  );

  const logoutContent = useMemo(() => {
    switch (authStage) {
      case AuthStages.LOGGING_OUT:
        return <p>Loading...</p>;
      case AuthStages.LOGGED_OUT:
        return <Redirect to="/" />;
      case AuthStages.LOGOUT_FAILURE:
        return (
          <p>
            <Text text={profileError} />
          </p>
        );
      default:
        return (
          <Button
            type="button"
            viewType="secondary"
            onClick={logoutButtonClick}
          >
            Logout
          </Button>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStage, logoutButtonClick, authError]);
  const profileContent = useMemo(() => {
    switch (profileStage) {
      case ProfileStages.FAILURE:
        return (
          <div>
            <Heading text="Error" color="primary" />
            <p>
              <Text text={profileError} />
            </p>
          </div>
        );
      case ProfileStages.LOADED:
        return (
          <div>
            <div className={b("row")}>
              <div className={b("column")}>
                <Heading
                  color="accent"
                  text="Profile"
                  className={b("heading")}
                />
              </div>
            </div>
            <div className={b("row")}>
              <div className={b("column")}>
                <FormView
                  onSubmit={profileFormSubmit}
                  fields={UserFields}
                  values={userValues}
                  buttonText="Save"
                />
              </div>
              <div className={b("column")}>
                <div className={b("avatar-field")}>
                  <Text
                    className={b("avatar-label")}
                    text="Avatar"
                    color="light"
                    size="s"
                  />
                  <div className={b("avatar-wrapper")}>
                    <label className={b("avatar-input-label")}>
                      <input
                        type="file"
                        className={b("avatar-input")}
                        onChange={onAvatarInputChange}
                      />
                    </label>
                    <img src={pencil} alt="edit" className={b("pencil")} />
                    <Avatar size="large" src={profileUser.avatar} />
                  </div>
                </div>
                <FormView
                  onSubmit={passwordFormSubmit}
                  fields={PasswordFields}
                  buttonText="Change"
                />
              </div>
            </div>
          </div>
        );
      default:
        return <p>Loading...</p>;
    }
  }, [
    profileError,
    profileStage,
    userValues,
    profileFormSubmit,
    passwordFormSubmit,
    onAvatarInputChange,
    profileUser.avatar,
  ]);

  return (
    <Page
      left={<LinkView to="/" label="Menu" size="xl" />}
      right={logoutContent}
    >
      <div className={b.mix(className)}>
        <Panel className={b("panel")}>{profileContent}</Panel>
      </div>
    </Page>
  );
};

const WrappedProfile = memo(Profile);
export { WrappedProfile as Profile };
