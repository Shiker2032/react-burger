import styles from "./burgerIngredients.module.css";
import IngredientsItem from "./IngredientsItem";
import Tabs from "./Tabs";
import { FC, useRef } from "react";
import { TIngredient } from "../../services/types";
import { useSelectorHook } from "../../services/types/index";

type TBurgerIngredientsProps = {
  onClick: (ingredient: TIngredient) => void;
};

const BurgerIngredients: FC<TBurgerIngredientsProps> = ({ onClick }) => {
  const ingredients = useSelectorHook(
    (store) => store.ingredientsReducer.ingredients
  );

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

            .filter((ingredient: TIngredient) => ingredient.type === "bun")
            .map((ingredient: TIngredient, idx: number) => {
              return (
                <IngredientsItem
                  ingredient={ingredient}
                  onClick={() => onClick(ingredient)}
                  key={idx}
                />
              );
            })}
        </ul>

        <h3 className="text text_type_main-medium" ref={tabRefs.saucesRef}>
          Соусы
        </h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient: TIngredient) => ingredient.type === "sauce")
            .map((ingredient: TIngredient, idx: number) => {
              return (
                <IngredientsItem
                  key={idx}
                  ingredient={ingredient}
                  onClick={onClick}
                />
              );
            })}
        </ul>

        <h3 className="text text_type_main-medium" ref={tabRefs.ingredientsRef}>
          Начинки
        </h3>
        <ul className={styles.burgerIngredients__cardList}>
          {ingredients
            .filter((ingredient: TIngredient) => ingredient.type === "main")
            .map((ingredient: TIngredient, idx: number) => {
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
