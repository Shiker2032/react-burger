import React from "react";
import styles from "./feedDetailsElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function FeedDetailsElement(props) {
  return (
    <div className={styles.feedDetailsElement}>
      <div className={styles.feedDetailsElement__images}>
        <img
          className={styles.feedDetailsElement__image}
          src="https://avatars.mds.yandex.net/get-mpic/5344223/img_id5569967395110822865.jpeg/190x250"
        />
        <p className="text text_type_main-default pb-6">Флюоресцентная булка</p>
      </div>
      <div className={styles.feedDetailsElement__priceBlock}>
        <p className="text text_type_digits-default pr-2">2 x 480</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default FeedDetailsElement;
