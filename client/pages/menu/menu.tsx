import block from "bem-cn";
import React, { FC, memo } from "react";
import { Heading } from "../../components/heading";
import { LinkView } from "../../components/link-view";
import { Page } from "../../components/page";

import "./menu.css";

const b = block("menu");

type Props = {
  className?: string;
};

const MenuItems = [
  {
    to: "/game",
    label: "Start Game",
  },
  {
    to: "/profile",
    label: "Profile",
  },
  {
    to: "/leaderboard",
    label: "Leaderboard",
  },
  {
    to: "/forum",
    label: "Forum",
  },
];

const Menu: FC<Props> = ({ className = "" }) => {
  return (
    <Page fixHeader fullHeight>
      <div className={b.mix(className)}>
        <Heading
          color="primary"
          text="Taipei Runner"
          size="l"
          className={b("heading")}
        />
        <ul className={b("list")}>
          {MenuItems.map(({ label, to }) => (
            <li className={b("item")} key={label}>
              <LinkView to={to} label={label} size="xxl" />
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};

const WrappedMenu = memo(Menu);
export { WrappedMenu as Menu };
