import React from "react";
import styles from "./feedOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

function FeedOrder({ order }) {
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);

  const getImage = (ingredientEl) => {
    if (ingredientEl && ingredientsArr) {
      const ingredientImage = ingredientsArr.ingredients.find(
        (el) => el._id === ingredientEl
      );
      return ingredientImage.image;
    }
  };

  return (
    <>
      <div className={styles.order}>
        <div className={styles.info}>
          <div className={styles.info__code}>
            <p className="text text_type_main-default">#</p>
            <p className="text text_type_digits-default">
              {order && order.number}
            </p>
          </div>
          <p className="text text_type_main-default pt-6 pb-6 text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </p>
        </div>
        <p className="text text_type_main-medium pb-6">{order && order.name}</p>

        <div className={styles.summary}>
          <div className={styles.summary__images}>
            {order &&
              order.ingredients.map((ingredientEl) => (
                <img
                  key={uuidv4()}
                  className={styles.summary__image}
                  src={getImage(ingredientEl)}
                />
              ))}
          </div>
          <div className={styles.summary__priceBlock}>
            <p className="text text_type_digits-default pr-2">480</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedOrder;
