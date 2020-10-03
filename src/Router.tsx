import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />

        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
