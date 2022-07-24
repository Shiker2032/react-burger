import React from "react";
import styles from "./feedStatus.module.css";

import { v4 as uuidv4 } from "uuid";

function FeedStatus({ orders }) {
  const completedOrders =
    orders &&
    orders.filter((orderEl) => orderEl.status === "done").splice(0, 10);
  const pendingOrders =
    orders &&
    orders.filter((orderEl) => orderEl.status === "pending").splice(0, 10);

  return (
    <div className={styles.status}>
      <div className={styles.status__wrapper}>
        <div className={styles.status__ready}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={styles.status__numbers_green}>
            {completedOrders &&
              completedOrders.map((orderEl) => (
                <p className="text text_type_digits-default" key={uuidv4()}>
                  {orderEl.number}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.status__working}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.status__numbers}>
            {pendingOrders &&
              pendingOrders.map((orderEl) => (
                <p className="text text_type_digits-default" key={uuidv4()}>
                  {orderEl.number}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="completedAllTime">
        <p className="text text_type_main-medium pt-15">
          Выполнено за все время:
        </p>
        <p className="text text_type_digits-large">{orders && orders.total}</p>
      </div>
      <div className="completedToday">
        <p className="text text_type_main-medium pt-15">
          Выполнено за сегодня:
        </p>
        <p className="text text_type_digits-large">
          {orders && orders.totalToday}
        </p>
      </div>
    </div>
  );
}

export default FeedStatus;
