import block from "bem-cn";
import React, { FC, memo } from "react";
import { Heading } from "client/components/heading";
import { LinkView } from "client/components/link-view";
import { Page } from "client/components/page";
import { PageMeta } from "client/components/page-meta";

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
  {
    to: "/feedback",
    label: "Contact Us",
  },
];

const Menu: FC<Props> = ({ className = "" }) => {
  return (
    <>
      <PageMeta title="title" description="description" />
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
    </>
  );
};

const WrappedMenu = memo(Menu);
export { WrappedMenu as Menu };
