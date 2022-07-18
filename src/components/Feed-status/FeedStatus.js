import React from "react";
import styles from "./feedStatus.module.css";

function FeedStatus(props) {
  return (
    <div className={styles.status}>
      <div className={styles.status__wrapper}>
        <div className={styles.status__ready}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={styles.status__numbers_green}>
            <p className="text text_type_digits-default pr-9">1234567890</p>
            <p className="text text_type_digits-default">1234567890</p>
            <p className="text text_type_digits-default">1234567890</p>
          </div>
        </div>
        <div className={styles.status__working}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.status__numbers}>
            <p className="text text_type_digits-default">1234567890</p>
            <p className="text text_type_digits-default">1234567890</p>
            <p className="text text_type_digits-default">1234567890</p>
          </div>
        </div>
      </div>
      <div className="completedAllTime">
        <p className="text text_type_main-medium pt-15">
          Выполнено за все время:
        </p>
        <p className="text text_type_digits-large">28 752</p>
      </div>
      <div className="completedToday">
        <p className="text text_type_main-medium pt-15">
          Выполнено за сегодня:
        </p>
        <p className="text text_type_digits-large">138</p>
      </div>
    </div>
  );
}

export default FeedStatus;
