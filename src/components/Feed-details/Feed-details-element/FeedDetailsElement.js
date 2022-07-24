import React from "react";
import styles from "./feedDetailsElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

function FeedDetailsElement({ ingredient }) {
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);

  const getIngredient = (id) => {
    if (id && ingredientsArr) {
      const ingredient = ingredientsArr.ingredients.find((el) => el._id === id);
      return ingredient;
    }
  };

  return (
    <div className={styles.feedDetailsElement}>
      <div className={styles.feedDetailsElement__images}>
        <img
          className={styles.feedDetailsElement__image}
          src={ingredient && getIngredient(ingredient).image}
        />
        <p className="text text_type_main-default pb-6">
          {ingredient && getIngredient(ingredient).name}
        </p>
      </div>
      <div className={styles.feedDetailsElement__priceBlock}>
        <p className="text text_type_digits-default pr-2">
          {ingredient && getIngredient(ingredient).price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default FeedDetailsElement;
