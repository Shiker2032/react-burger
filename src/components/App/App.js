import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Constructor from "../../pages/Constructor";
import ForgotPassword from "../../pages/ForgotPassword";
import Ingredient from "../../pages/IngredientDetails";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassword";
import { checkUserAPI } from "../../services/actions/user";
import Modal from "../Modal/Modal";
import { ProtectedRoute } from "../ProtectedRoute";

import Header from "../Header/Header";
import { getIngredients } from "../../services/actions/ingredient";
import Feed from "../../pages/Feed";
import FeedDetails from "../Feed-details/FeedDetails";
import OrderHistory from "../../pages/OrderHistory";

function App(props) {
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const dispatch = useDispatch();

  const user = useSelector((store) => store.authReducer.user);

  useEffect(() => {
    reloadUser();
    dispatch(getIngredients());
  }, []);

  const reloadUser = () => {
    if (!user && localStorage.refreshToken) {
      dispatch(checkUserAPI());
    }
  };

  return (
    <>
      <Header />
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
        <ProtectedRoute path="/profile/orders" exact={true}>
          <OrderHistory />
        </ProtectedRoute>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>

        <Route path="/feed" exact>
          <Feed />
        </Route>

        <Route path="/feed/:id" exact>
          <FeedDetails />
        </Route>

        <Route
          path="/ingredients/:id"
          children={
            <>
              <Ingredient />
            </>
          }
        />

        <Route
          path="/ingredients/:id"
          children={
            <>
              <Ingredient />
            </>
          }
        />

        <Route
          path="/profile/orders/:id"
          children={
            <>
              <FeedDetails />
            </>
          }
        ></Route>
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

      {background && (
        <Route
          path="/feed/:id"
          exact
          children={
            <Modal
              onCloseClick={() => {
                history.replace({
                  pathname: "/feed",
                });
              }}
            >
              <FeedDetails />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal
              onCloseClick={() => {
                history.replace({
                  pathname: "/profile/orders",
                });
              }}
            >
              <FeedDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
