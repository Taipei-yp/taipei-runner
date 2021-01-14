import block from "bem-cn";
import React, { FC, memo, useCallback } from "react";
import pencil from "client/assets/images/pencil.png";
import { Avatar } from "client/components/avatar";
import { Button } from "client/components/button";
import { FormView, FormViewField } from "client/components/form-view";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { Panel } from "client/components/panel";
import { Text } from "client/components/text";
import { SignUpUser } from "client/models/user";

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
    labelText: "Email",
    // eslint-disable-next-line no-useless-escape,max-len
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: "Wrong format",
    type: "email",
    name: "email",
  },
  {
    labelText: "Password",
    pattern: /^.{6,}$/,
    errorMessage: "The length of this field must be > 6 characters",
    type: "password",
    name: "password",
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
    name: "password",
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
  const formSubmit = useCallback((formValue: SignUpUser) => {
    console.log(formValue);
  }, []);

  return (
    <Page
      left={<LinkView to="/" label="Menu" size="xl" />}
      right={
        <Button type="button" viewType="secondary">
          Logout
        </Button>
      }
    >
      <div className={b.mix(className)}>
        <Panel className={b("panel")}>
          <div className={b("row")}>
            <div className={b("column")}>
              <Heading color="accent" text="Profile" className={b("heading")} />
            </div>
          </div>
          <div className={b("row")}>
            <div className={b("column")}>
              <FormView
                onSubmit={formSubmit}
                fields={UserFields}
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
                  <img src={pencil} alt="edit" className={b("pencil")} />
                  <Avatar size="large" />
                </div>
              </div>
              <FormView
                onSubmit={formSubmit}
                fields={PasswordFields}
                buttonText="Change"
              />
            </div>
          </div>
        </Panel>
      </div>
    </Page>
  );
};

const WrappedProfile = memo(Profile);
export { WrappedProfile as Profile };
