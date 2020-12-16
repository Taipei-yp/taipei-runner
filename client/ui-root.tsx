import { hot } from "react-hot-loader/root";
import * as React from "react";
import App from "./app";
import AppError from "./app-error";
import ErrorBoundary from "./components/error-boundary/error-boudary";

const UiRoot: React.FC = () => {
  return <ErrorBoundary content={<App />} errorContent={<AppError />} />;
};

export default hot(UiRoot);
