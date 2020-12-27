import React, { FC, memo } from "react";
import block from "bem-cn";
import "./link-view.css";
import { Link } from "react-router-dom";

const b = block("link-view");

type Props = {
  className?: string;
  to: string;
  label: string;
  size: "small" | "normal";
};

const LinkView: FC<Props> = ({ className, to, label, size }) => {
  return (
    <Link to={to} className={b({ size }).mix(className)}>
      {label}
    </Link>
  );
};

const WrappedLinkView = memo(LinkView);
export { WrappedLinkView as LinkView };
