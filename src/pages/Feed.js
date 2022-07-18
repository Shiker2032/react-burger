import React from "react";
import styles from "./feed.module.css";

import FeedOrder from "../components/Feed-order/FeedOrder";
import FeedStatus from "../components/Feed-status/FeedStatus";

function Feed(props) {
  return (
    <div className={styles.content}>
      <div className={styles.orders}>
        <p className="text text_type_main-large pb-6 pt-6">Лента заказов</p>
        <FeedOrder />
        <FeedOrder />
        <FeedOrder />
      </div>
      <FeedStatus />
    </div>
  );
}

export default Feed;
