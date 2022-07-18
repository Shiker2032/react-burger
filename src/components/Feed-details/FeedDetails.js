import React from "react";
import styles from "./feedDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsElement from "./Feed-details-element/FeedDetailsElement";

function FeedDetails(props) {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <div className={styles.info__code}>
          <p className="text text_type_main-default">#</p>
          <p className="text text_type_digits-default pb-10">1234567890</p>
        </div>
      </div>
      <p className="text text_type_main-medium pb-3">
        Death Star Starship Main бургер
      </p>
      <p
        className="text text_type_main-default pb-15"
        style={{ color: "#00CCCC " }}
      >
        Выполнен
      </p>
      <p className="text text_type_main-default pb-6">Состав:</p>
      <FeedDetailsElement />
      <FeedDetailsElement />
      <div className={styles.feedDetails__summary}>
        <p className="text text_type_main-default text_color_inactive pt-10">
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={styles.feedDetails__priceBlock}>
          <p className="text text_type_digits-default">2 x 480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
