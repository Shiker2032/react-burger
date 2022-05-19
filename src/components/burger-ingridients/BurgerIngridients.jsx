import React from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import PropTypesIngredientsData from "../../utils/propTypes";
import Tabs from "./Tabs";
import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";




const BurgerIngredients = ({ ingredients, onClick }) => {



  const [current, setCurrent] = useState("bun");
  return (
    <section className={`${styles.burgerIngredients} pt-10 mr-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.burgerIngredients__cardsWrapper} mt-10`}>
        <a name="bun"></a>
        <h3 className="text text_type_main-medium">Булки</h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient) => ingredient.type === "bun")
            .map((ingredient) => {
              return (
                <li className="pl-4 pr-2 pb-10" key={ingredient._id}>
                  <article
                    className={styles.burgerIngredients__cardElement}
                    onClick={() => onClick(ingredient)}
                  >
                    <div className="pl-4 pb-1 pr-4">
                      <img src={ingredient.image} />
                      <Counter count={1} size="default" />
                      <div className={styles.burgerIngredients__cardPrice}>
                        <p className="text text_type_digits-default pt-1">
                          {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                    <h3
                      className={`${styles.burgerIngredients__cardName} text text_type_main-default`}
                    >
                      {ingredient.name}
                    </h3>
                  </article>
                </li>
              );
            })}
        </ul>

        <a name="sauce"></a>
        <h3 className="text text_type_main-medium">Соусы</h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient) => ingredient.type === "sauce")
            .map((ingredient) => {
              return (
                <li className="pl-4 pr-2 pb-10" key={ingredient._id}>
                  <article
                    className={styles.burgerIngredients__cardElement}
                    onClick={() => onClick(ingredient)}
                  >
                    <div className="pl-4 pb-1 pr-4">
                      <img src={ingredient.image} />
                      <div className={styles.burgerIngredients__cardPrice}>
                        <p className="text text_type_digits-default pt-1">
                          {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                    <h3
                      className={`${styles.burgerIngredients__cardName} text text_type_main-default`}
                    >
                      {ingredient.name}
                    </h3>
                  </article>
                </li>
              );
            })}
        </ul>

        <a name="main"></a>
        <h3 className="text text_type_main-medium">Начинки</h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient) => ingredient.type === "main")
            .map((ingredient) => {
              return (
                <li className="pl-4 pr-2 pb-10" key={ingredient._id}>
                  <article
                    className={styles.burgerIngredients__cardElement}
                    onClick={() => onClick(ingredient)}
                  >
                    <div className="pl-4 pb-1 pr-4">
                      <img src={ingredient.image} />
                      <div className={styles.burgerIngredients__cardPrice}>
                        <p className="text text_type_digits-default pt-1">
                          {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                    <h3
                      className={`${styles.burgerIngredients__cardName} text text_type_main-default`}
                    >
                      {ingredient.name}
                    </h3>
                  </article>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypesIngredientsData).isRequired,
};

export default BurgerIngredients;
