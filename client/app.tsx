import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routing } from "./components/routing";

export const App: FC = () => {
  return (
    <div className="app">
      <Router>
        <Routing />
      </Router>
    </div>
  );
};
