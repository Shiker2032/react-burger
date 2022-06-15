import React from "react";
import styles from "../Burger-ingredients/burgerIngredients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

function IngredientsItem({ ingredient, onClick }) {  
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;
  if (isDragging) dispatch({ type: "SET_DRAGGING", isDragging: isDragging });

  return (
    <li className="pl-4 pr-2 pb-10">
      <article
        className={styles.burgerIngredients__cardElement}
        onClick={() => onClick(ingredient)}
      >
        <div className="pl-4 pb-1 pr-4">
          {ingredient.amount > 0 && (
            <Counter count={ingredient.amount} size="default" />
          )}
          <img
            ref={dragRef}
            src={ingredient.image}
            style={{ opacity: opacity }}
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
