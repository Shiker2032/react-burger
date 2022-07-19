import React from "react";
import styles from "./feedDetailsElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

function FeedDetailsElement({ ingredient }) {
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
    <div className={styles.feedDetailsElement}>
      <div className={styles.feedDetailsElement__images}>
        <img
          className={styles.feedDetailsElement__image}
          src={getImage(ingredient)}
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
