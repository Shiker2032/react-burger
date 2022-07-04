import React from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import Constructor from "../../pages/Constructor";
import ForgotPassword from "../../pages/ForgotPassword";
import Ingredient from "../../pages/Ingredient";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassword";
import { ProtectedRoute } from "../ProtectedRoute";

function App(props) {
  const location = useLocation();
  return (
    <div>
      <Switch>
        <Route path="/" exact={true}>
          <Constructor />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/ingredients/:id" exact>
          <Ingredient />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
