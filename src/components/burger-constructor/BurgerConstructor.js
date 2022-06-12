import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import styles from "./burgerConstructor.module.css";
import ConstructorItem from "./ConstructorItem";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { SET_BUN, SET_ORDER } from "../../services/types";
import { setCurrentIngredient } from "../../services/actions";

const BurgerConstructor = ({ onClick }) => {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);

  useEffect(() => {
    order.map((orderEl) => {
      if (orderEl.type !== "bun") {
        dispatch({ type: "addIngridient", payload: orderEl.price });
      } else {
        dispatch({ type: "addBun", payload: orderEl.price });
      }
    });
  }, [order]);

  const handleDrop = (ingredient) => {
    order.find((el) => el.type === "bun") && ingredient.type === "bun"
      ? dispatch({
          type: SET_BUN,
          ingredient: ingredient,
        })
      : dispatch({
          type: SET_ORDER,
          ingredient: ingredient,
        });
  };

  const [{ isOver }, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item) => handleDrop(item.ingredient),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <section ref={dropTarget} className={`${styles.burgerConstructor} pl-4`}>
      {order
        .filter((ingredient) => ingredient.type === "bun")
        .map((ingredient) => {
          return (
            <article
              key={ingredient._id}
              className={`${styles.burgerConstructor__cardBunElement} ml-8 mr-2 mt-25`}
            >
              <ConstructorItem
                ingredient={ingredient}
                isLocked={true}
                type={"top"}
              >
                верх{" "}
              </ConstructorItem>
            </article>
          );
        })}

      <div className={styles.burgerConstructor__wrapper}>
        <ul className={`${styles.burgerConstructor__list} pr-4`}>
          {order.length > 1 &&
            order.map((ingredient) => {
              if (ingredient.price !== 0 && ingredient.type !== "bun") {
                return (
                  <li key={ingredient._id}>
                    <article className={styles.burgerConstructor__cardElement}>
                      <p className={styles.burgerConstructor__dragIcon}>
                        <DragIcon type="primary" />
                      </p>
                      <ConstructorItem ingredient={ingredient} type={""} />
                    </article>
                  </li>
                );
              }
            })}
        </ul>
      </div>

      {order
        .filter((ingredient) => ingredient.type === "bun")
        .map((ingredient) => {
          return (
            <article
              key={ingredient._id}
              className={`${styles.burgerConstructor__cardBunElement} ml-8 mr-2 mb-6`}
            >
              <ConstructorItem
                ingredient={ingredient}
                isLocked={true}
                type={"bottom"}
              >
                низ{" "}
              </ConstructorItem>
            </article>
          );
        })}

      {order.find((orderEl) => orderEl.type === "bun") && (
        <div
          className={`${styles.burgerConstructor__totalPriceContainer} mr-4`}
        >
          <div className={`${styles.burgerConstructor__totalPrice} pr-10`}>
            <p
              className={`${styles.burgerConstructor__price} $text text_type_digits-medium`}
            ></p>
            <p className="text text_type_digits-medium">{1}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={onClick}>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
