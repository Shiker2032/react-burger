import React, { useEffect } from "react";
import styles from "./feed.module.css";

import { v4 as uuidv4 } from "uuid";

import FeedOrder from "../components/Feed-order/FeedOrder";
import FeedStatus from "../components/Feed-status/FeedStatus";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/wsActions";
import { useDispatch, useSelector } from "react-redux";
import FeedDetails from "../components/Feed-details/FeedDetails";

function Feed(props) {
  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.wsReducer);

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={styles.content}>
      <div className={styles.orders}>
        <p className="text text_type_main-large pb-6 pt-6">Лента заказов</p>
        {orders &&
          orders.orders.map((orderEl) => (
            <FeedOrder order={orderEl} key={uuidv4()} />
          ))}
      </div>
      <FeedStatus orders={orders} />
    </div>
  );
}

export default Feed;
