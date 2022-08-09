import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ADD_INGREDIENT_PRICE,
  IIngredient,
  INCREMENT_INGREDIENT,
  REMOVE_INGREDIENT,
  SUBTRACT_INGREDIENT_AMOUNT,
} from "../../services/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import ConstructorItem from "./ConstructorItem";
import styles from "./burgerConstructor.module.css";

import { v4 as uuidv4 } from "uuid";
import { setOrder } from "../../services/actions/order";
import { FC } from "react";
import {
  addIngredientPrice,
  incrementIngredient,
  removeIngredient,
  setBun,
  setBunPrice,
  subtracIngredient,
  subtractBun,
} from "../../services/actions/ingredient";

type TBurgerConstructorProps = {
  onClick: () => void;
};

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const { order, price } = useSelector((store: any) => ({
    order: store.orderReducer.order,
    price: store.priceReducer,
  }));

  const handleDrop = (ingredient: IIngredient) => {
    if (
      order.find((el: IIngredient) => el.type === "bun") &&
      ingredient.type === "bun"
    ) {
      const previousBun = order.filter((el: IIngredient) => el.type === "bun");
      console.log(previousBun);

      dispatch(subtractBun(previousBun[0]));
      dispatch(setBun(ingredient));
    }

    {
      if (ingredient.type !== "bun") {
        dispatch(setOrder(ingredient, uuidv4()));
      }
    }
    if (ingredient.type === "bun") {
      dispatch(setBun(ingredient));
      dispatch(setBunPrice(ingredient.price * 2));
    } else {
      dispatch(incrementIngredient(ingredient));
      dispatch(addIngredientPrice(ingredient.price));
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (item: { ingredient: IIngredient }) => {
      handleDrop(item.ingredient);
    },
  });

  const handleClose = (ingredient: IIngredient) => {
    dispatch(subtracIngredient(ingredient));
    dispatch(removeIngredient(ingredient));
  };

  return (
    <section
      id={"constructor"}
      ref={dropTarget}
      className={`${styles.burgerConstructor} pl-4`}
    >
      {order
        .filter((ingredient: IIngredient) => ingredient.type === "bun")
        .map((ingredient: IIngredient) => {
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
            order.map((ingredient: IIngredient, idx: number) => {
              if (ingredient.price !== 0 && ingredient.type !== "bun") {
                return (
                  <li key={ingredient.uid}>
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
        .filter((ingredient: IIngredient) => ingredient.type === "bun")
        .map((ingredient: IIngredient) => {
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

      {order.find((orderEl: IIngredient) => orderEl.type === "bun") && (
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

export default BurgerConstructor;
