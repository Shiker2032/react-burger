import React from "react";
import { useDispatch } from "react-redux";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Constructor from "../../pages/Constructor";
import ForgotPassword from "../../pages/ForgotPassword";
import Ingredient from "../../pages/IngredientDetails";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassword";
import { refreshUserAPI } from "../../services/actions";
import Modal from "../Modal/Modal";
import { ProtectedRoute } from "../ProtectedRoute";

import Header from "../Header/Header";

function App(props) {
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const dispatch = useDispatch();

  const refreshUser = () => {
    dispatch(refreshUserAPI(localStorage.refreshToken));
  };

  return (
    <>
      <button onClick={refreshUser}>Рефреш токен</button>
      <Switch location={background || location}>
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
        <Route
          path="/ingredients/:id"
          children={
            <>
              <Header />
              <Ingredient />
            </>
          }
        />
      </Switch>
      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal
              onCloseClick={() => {
                history.replace({
                  pathname: "/",
                });
              }}
            >
              <Ingredient />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
