import React from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import PropTypesIngredientsData from "../../utils/propTypes";
import Tabs from "./Tabs";
import { useState, useRef } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import IngredientsItem from "../Ingredients-item/IngredientsItem";

const BurgerIngredients = ({ onClick }) => {
  const ingredients = useSelector((store) => store.ingredients);
  const tabRefs = {
    bunRef: useRef(null),
    ingredientsRef: useRef(null),
    saucesRef: useRef(null),
  };
  return (
    <section className={`${styles.burgerIngredients} pt-10 mr-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <Tabs tabRefs={tabRefs} />
      <div className={`${styles.burgerIngredients__cardsWrapper} mt-10`}>
        <h3 className="text text_type_main-medium" ref={tabRefs.bunRef}>
          Булки
        </h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient, idx) => {
              return (
                <IngredientsItem
                  ingredient={ingredient}
                  onClick={() => onClick(ingredient)}
                  key={idx}
                />
              );
            })}
        </ul>

        <a name="sauce"></a>
        <h3 className="text text_type_main-medium" ref={tabRefs.saucesRef}>
          Соусы
        </h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient) => ingredient.type === "sauce")
            .map((ingredient, idx) => {
              return (
                <IngredientsItem
                  key={idx}
                  ingredient={ingredient}
                  onClick={onClick}
                />
              );
            })}
        </ul>

        <a name="main"></a>
        <h3 className="text text_type_main-medium" ref={tabRefs.ingredientsRef}>
          Начинки
        </h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient) => ingredient.type === "main")
            .map((ingredient, idx) => {
              return (
                <IngredientsItem
                  ingredient={ingredient}
                  onClick={onClick}
                  key={idx}
                />
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
