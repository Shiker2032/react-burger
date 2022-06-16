import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ADD_BUN_PRICE,
  ADD_INGREDIENT_PRICE,
  INCREMENT_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_BUN,
  SET_ORDER,
  SUBTRACT_BUN_AMOUNT,
  SUBTRACT_INGREDIENT_AMOUNT,
} from "../../services/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorItem from "./ConstructorItem";
import styles from "./burgerConstructor.module.css";

import { v4 as uuidv4 } from "uuid";

const BurgerConstructor = ({ onClick }) => {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  const price = useSelector((store) => store.price);

  const handleDrop = (ingredient) => {
    if (order.find((el) => el.type === "bun") && ingredient.type === "bun") {
      const previousBun = order.filter((el) => el.type === "bun");
      dispatch({
        type: SUBTRACT_BUN_AMOUNT,
        bun: previousBun,
      });
      dispatch({
        type: SET_BUN,
        ingredient: ingredient,
      });
    }

    {
      if (ingredient.type !== "bun") {
        dispatch({
          type: SET_ORDER,
          ingredient: ingredient,
        });
      }
    }
    if (ingredient.type === "bun") {
      dispatch({ type: SET_BUN, ingredient });
      dispatch({ type: ADD_BUN_PRICE, price: ingredient.price * 2 });
    } else {
      dispatch({ type: INCREMENT_INGREDIENT, ingredient: ingredient });
      dispatch({ type: ADD_INGREDIENT_PRICE, price: ingredient.price });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item) => handleDrop(item.ingredient),
  });

  const handleClose = (ingredient) => {
    dispatch({ type: SUBTRACT_INGREDIENT_AMOUNT, ingredient: ingredient });
    dispatch({ type: REMOVE_INGREDIENT, ingredient: ingredient });
  };

  return (
    <section
      id={"constructor"}
      ref={dropTarget}
      className={`${styles.burgerConstructor} pl-4`}
    >
      {order
        .filter((ingredient) => ingredient.type === "bun")
        .map((ingredient) => {
          return (
            <article
              key={ingredient._id}
              className={`${styles.burgerConstructor__cardBunElement} ml-8 mr-2 mt-25`}
            >
              <ConstructorElement
                handleClose={() => handleClose(ingredient)}
                type={"top"}
                isLocked={true}
                text={ingredient.name + " верх"}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </article>
          );
        })}

      <div className={styles.burgerConstructor__wrapper}>
        <ul className={`${styles.burgerConstructor__list} pr-4`}>
          {order.length > 1 &&
            order.map((ingredient, idx) => {
              if (ingredient.price !== 0 && ingredient.type !== "bun") {
                return (
                  <li key={uuidv4()}>
                    <ConstructorItem
                      ingredient={ingredient}
                      index={idx}
                      id={ingredient._id}
                    />
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
              <ConstructorElement
                handleClose={() => handleClose(ingredient)}
                type={"bottom"}
                isLocked={true}
                text={ingredient.name + " низ"}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
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
            <p className="text text_type_digits-medium">
              {price.bunPrice + price.ingredientPrice}
            </p>
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
  onClick: PropTypes.func,
};

export default BurgerConstructor;
