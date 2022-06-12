import React from "react";
import styles from "../Burger-ingredients/burgerIngredients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";

function IngredientsItem({ ingredient, onClick }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li className="pl-4 pr-2 pb-10">
      <article
        className={styles.burgerIngredients__cardElement}
        onClick={() => onClick(ingredient)}
      >
        <div className="pl-4 pb-1 pr-4">
          <img
            ref={dragRef}
            src={ingredient.image}
            style={{ border: isDragging ? "5px solid blue" : "0px" }}
          />
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
}

export default IngredientsItem;
