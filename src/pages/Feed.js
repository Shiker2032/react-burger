import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import FeedStatus from "../components/Feed-status/FeedStatus";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/wsActions";
import FeedOrder from "../components/Feed-order/FeedOrder";
import { useHistory, useLocation } from "react-router-dom";
import { RESET_TAB_STATE, SET_TAB_STATE } from "../services/types";
import styles from "./feed.module.css";
import { calculateOrderTime } from "../utils/utils";

function Feed(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { orders } = useSelector((store) => store.wsReducer);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });
    dispatch({ type: RESET_TAB_STATE });
    dispatch({
      type: SET_TAB_STATE,
      name: "orderFeed",
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const handleFeedClick = (order) => {
    history.replace({
      pathname: `/feed/${order._id}`,
      state: { background: location },
    });
  };

  return (
    <div className={styles.content}>
      <div className={styles.orders}>
        <p className="text text_type_main-large pb-6">Лента заказов</p>
        {orders &&
          orders.map((orderEl) => (
            <FeedOrder
              order={orderEl}
              handleFeedClick={handleFeedClick}
              key={uuidv4()}
              time={calculateOrderTime(orderEl)}
            />
          ))}
      </div>
      <FeedStatus orders={orders} />
    </div>
  );
}

export default Feed;
