import React from "react";
import styles from "./feedOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function FeedOrder(props) {
  return (
    <>
      <p className="text text_type_main-large pb-6 pt-6">Лента заказов</p>
      {/* компонент order */}

      <div className={styles.order}>
        <div className={styles.info}>
          <div className={styles.info__code}>
            <p className="text text_type_main-default">#</p>
            <p className="text text_type_digits-default">1234567890</p>
          </div>
          <p className="text text_type_main-default pt-6 pb-6 text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </p>
        </div>
        <p className="text text_type_main-medium pb-6">
          Death Star Starship Main бургер
        </p>

        <div className={styles.summary}>
          <div className={styles.summary__images}>
            <img
              className={styles.summary__image}
              src="https://avatars.mds.yandex.net/get-mpic/5344223/img_id5569967395110822865.jpeg/190x250"
            />
            <img
              className={styles.summary__image}
              src="https://avatars.mds.yandex.net/get-mpic/5344223/img_id5569967395110822865.jpeg/190x250"
            />
            <img
              className={styles.summary__image}
              src="https://avatars.mds.yandex.net/get-mpic/5344223/img_id5569967395110822865.jpeg/190x250"
            />
          </div>
          <div className={styles.summary__priceBlock}>
            <p className="text text_type_digits-default">480</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedOrder;
