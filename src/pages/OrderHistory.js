import styles from "./orderHistory.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, patchUser } from "../services/actions/user";
import { RESET_TAB_STATE, SET_TAB_STATE } from "../services/types";
import FeedOrder from "../components/Feed-order/FeedOrder";
import { useHistory, useLocation } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../components/API/api";
import {
  wsConnectionClose,
  wsConnectionStart,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/wsActions";
import { resetTab, setTab } from "../services/actions/tabs";

function OrderHistory(props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [profileIsActive, setProfileIsActive] = useState(false);
  const [orderHistoryIsActive, setOrderHistoryIsActive] = useState(false);

  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetTab());
    dispatch(setTab("profile"));
    setOrderHistoryIsActive(true);
    dispatch(wsConnectionStart(`?token=${getCookie("token").slice(1)}`));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const logOutClick = () => {
    dispatch(logOutUser());
    history.replace({ pathname: "/login" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputData = {
      name: nameInput ? nameInput : auth.user.name,
      email: emailInput ? emailInput : auth.user.email,
    };

    dispatch(patchUser(inputData));
  };

  const handleFeedClick = (order) => {
    history.replace({
      pathname: `/profile/orders/${order._id}`,
      state: { background: location },
    });
  };

  const profileClick = () => {
    history.replace({
      pathname: "/profile",
    });
  };

  const { orders } = useSelector((store) => store.wsReducer);

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.profile__menu}>
          <p
            style={{ cursor: "pointer" }}
            onClick={profileClick}
            className={`text text_type_main-medium ${
              !profileIsActive ? "text_color_inactive" : ""
            } `}
          >
            Профиль
          </p>
          <p
            className={`text text_type_main-medium ${
              !orderHistoryIsActive ? `text_color_inactive` : ""
            }`}
          >
            История заказов
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={logOutClick}
            className={`text text_type_main-medium text_color_inactive pb-20`}
          >
            Выход
          </p>
          <p
            className="text text_type_main-small text_color_inactive "
            style={{ opacity: "0.4" }}
          >
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        </div>

        <div className={styles.ordersFeed}>
          {orders &&
            orders.map((orderEl) => (
              <FeedOrder
                handleFeedClick={handleFeedClick}
                order={orderEl}
                key={uuidv4()}
              />
            ))}
        </div>
      </main>
    </>
  );
}

export default OrderHistory;
