import React from "react";
import styles from "./feedDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsElement from "./Feed-details-element/FeedDetailsElement";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function FeedDetails(props) {
  const params = useParams();
  const { orders } = useSelector((store) => store.wsReducer);
  const orderInfo = orders?.filter((el) => el._id === params.id);

  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <div className={styles.info__code}>
          <p className="text text_type_main-default pt-4">#</p>
          <p className="text text_type_digits-default pt-4 pb-10">
            {orderInfo && orderInfo[0].number}
          </p>
        </div>
      </div>
      <p
        style={{ maxWidth: "450px", textAlign: "center" }}
        className="text text_type_main-medium pb-3"
      >
        {orderInfo && orderInfo[0].name}
      </p>
      <p
        className="text text_type_main-default pb-15"
        style={{ color: "#00CCCC " }}
      >
        Выполнен
      </p>
      <p className="text text_type_main-default pb-6">Состав:</p>
      <div className={styles.detailsElements}>
        {orderInfo &&
          orderInfo[0].ingredients.map((el) => (
            <FeedDetailsElement ingredient={el} key={uuidv4()} />
          ))}
      </div>
      <div className={styles.feedDetails__summary}>
        <p className="text text_type_main-default text_color_inactive pt-10">
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={styles.feedDetails__priceBlock}>
          <p className="text text_type_digits-default pb-4">2 x 480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
