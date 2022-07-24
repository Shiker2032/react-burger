import React, { useEffect } from "react";
import styles from "./feed.module.css";

import { v4 as uuidv4 } from "uuid";

import FeedStatus from "../components/Feed-status/FeedStatus";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../services/actions/wsActions";
import { useDispatch, useSelector } from "react-redux";
import FeedDetails from "../components/Feed-details/FeedDetails";
import FeedOrder from "../components/Feed-order/FeedOrder";
import { useHistory, useLocation } from "react-router-dom";
function Feed(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { orders } = useSelector((store) => store.wsReducer);
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);

  const getIngredient = (id) => {
    if (id && ingredientsArr) {
      const ingredient = ingredientsArr.ingredients.find((el) => el._id === id);
      return ingredient;
    }
  };

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });

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

  const calculateOrderPrice = (orderArr) => {
    let price = 0;
    orderArr.ingredients.map((el_id) => {
      const ingredient = getIngredient(el_id);
      price += ingredient?.price;
    });

    return price;
  };

  const calculateOrderTime = (order) => {
    let date = new Date(order.createdAt);
    let dateNow = new Date(Date.now());
    let difference = Math.floor((dateNow - date) / (24 * 3600 * 1000));
    if (difference === 0) {
      difference = "Сегодня";
    } else if (difference === 1) {
      difference = "Вчера";
    } else {
      difference = difference.toString() + "дней";
    }

    const time = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;

    const dateString = `${difference}, ${time} i-GMT+3`;

    return dateString;
  };

  return (
    <div className={styles.content}>
      <div className={styles.orders}>
        <p className="text text_type_main-large pb-6 pt-6">Лента заказов</p>
        {orders &&
          orders.map((orderEl) => (
            <FeedOrder
              order={orderEl}
              handleFeedClick={handleFeedClick}
              key={uuidv4()}
              price={calculateOrderPrice(orderEl)}
              time={calculateOrderTime(orderEl)}
            />
          ))}
      </div>
      <FeedStatus orders={orders} />
    </div>
  );
}

export default Feed;
