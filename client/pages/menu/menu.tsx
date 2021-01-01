import React, { FC, memo } from "react";
import block from "bem-cn";
import { Heading } from "../../components/heading";
import { Page } from "../../components/page";
import { LinkView } from "../../components/link-view";

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
    label: "forum",
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
          {MenuItems.map(mi => (
            <li className={b("item")} key={mi.label}>
              <LinkView to={mi.to} label={mi.label} size="xxl" />
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};

const WrappedMenu = memo(Menu);
export { WrappedMenu as Menu };