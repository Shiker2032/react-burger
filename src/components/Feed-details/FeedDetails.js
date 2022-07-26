import React, { useEffect } from "react";
import styles from "./feedDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsElement from "./Feed-details-element/FeedDetailsElement";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { getIngredient, calculateOrderTime } from "../../utils/utils";

function FeedDetails(props) {
  const params = useParams();
  const { orders } = useSelector((store) => store.wsReducer);
  const orderInfo = orders?.filter((el) => el._id === params.id);
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);

  let arrDonor = [];

  const setArray = (orderInfo) => {
    if (orderInfo) {
      orderInfo[0]?.ingredients.map((el) => {
        arrDonor.push({ id: el, amount: 1 });
      });
      filterOrderInfo(arrDonor);
    }
  };

  const filterOrderInfo = (orderArr) => {
    let element = orderArr;
    element?.map((el, idx) => {
      let counter = 0;
      for (let i = 0; i < element?.length; i++) {
        if (el.id === element[i].id) {
          counter++;
        }

        if (el.id === element[i].id && counter > 1) {
          element[idx].amount = element[idx].amount + 1;
          element?.splice(i, 1);

          arrDonor = element;
        }
      }
    });
  };

  if (orderInfo) {
    setArray(orderInfo);
  }

  const calculateOrderPrice = (orderArr) => {
    let price = 0;
    orderArr?.ingredients.map((el_id) => {
      const ingredient = getIngredient(el_id, ingredientsArr);
      price += ingredient?.price;
    });
    return price;
  };

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
        {arrDonor &&
          arrDonor.map((el) => {
            return (
              <FeedDetailsElement
                orderInfo={orderInfo}
                ingredient={el}
                key={uuidv4()}
              />
            );
          })}
      </div>
      <div className={styles.feedDetails__summary}>
        <p className="text text_type_main-default text_color_inactive pt-10">
          {orderInfo && calculateOrderTime(orderInfo[0])}
        </p>
        <div className={styles.feedDetails__priceBlock}>
          <p className="text text_type_digits-default pb-4">
            {orderInfo && calculateOrderPrice(orderInfo[0])}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
