import React, { useEffect, useState } from "react";
import styles from "./feedOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function FeedOrder({ order, handleFeedClick, price, time }) {
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);
  const ingredients = order.ingredients;

  const getIngredient = (id) => {
    if (id && ingredientsArr) {
      const ingredient = ingredientsArr.ingredients.find((el) => el._id === id);
      return ingredient;
    }
  };

  const leftOverIngredient = getIngredient(ingredients[6]);

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
            {time && time}
          </p>
        </div>
        <p className="text text_type_main-medium pb-6">{order && order.name}</p>

        <div className={styles.summary}>
          <div className={styles.summary__images}>
            {ingredients &&
              ingredients.map((ingredientEl, idx) => {
                if (idx < 5) {
                  return (
                    <li
                      style={{ zIndex: 10 - idx }}
                      key={uuidv4()}
                      className={styles.image__container}
                    >
                      <img
                        style={{}}
                        onClick={(e) => handleFeedClick(order)}
                        className={styles.summary__image}
                        src={getIngredient(ingredientEl)?.image}
                      />
                    </li>
                  );
                }
              })}
            {leftOverIngredient && (
              <li
                style={{ zIndex: 10 - 5 }}
                key={uuidv4()}
                className={styles.image__container}
              >
                <img
                  style={{ opacity: "0.6" }}
                  onClick={(e) => handleFeedClick(order)}
                  className={styles.summary__image}
                  src={getIngredient(leftOverIngredient._id).image}
                />

                <p className={styles.counter}>+ {ingredients.length - 6}</p>
              </li>
            )}
          </div>
          <div className={styles.summary__priceBlock}>
            <p className="text text_type_digits-default pr-2">
              {price && price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedOrder;
