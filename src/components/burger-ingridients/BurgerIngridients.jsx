import React from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import PropTypesIngredientsData from "../../utils/propTypes";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ ingredients, onIngredientClick }) => {
  const [current, setCurrent] = useState("bun");
  return (
    <section className={`${styles.burgerIngredients} pt-10 mr-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={styles.burgerIngredients__tabList}>
        <a className={styles.burgerIngredients__tab} href="#bun">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a className={styles.burgerIngredients__tab} href="#sauce">
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a className={styles.burgerIngredients__tab} href="#main">
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>

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
                    onClick={() => onIngredientClick(ingredient)}
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
                    onClick={() => onIngredientClick(ingredient)}
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
                    onClick={() => onIngredientClick(ingredient)}
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

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(PropTypesIngredientsData).isRequired,
// };

export default BurgerIngredients;

// import React from "react";
// import Tabs from "../Tabs";

// import BurgerIngridient from "../burger-ingridient/BurgerIngridient";

// function BurgerIngridients({ data }) {
//   const buns = data.filter((data) => data.type == "bun");
//   const sauces = data.filter((data) => data.type == "sauce");
//   const mains = data.filter((data) => data.type == "main");
//   return (
//     <>
//       <div className="burgerIngridients">
//         <p className="text text_type_main-large">Соберите бургер</p>
//         <Tabs />
//         <div className="ingridientsConstuctor">
//           <p
//             style={{ paddingTop: "40px" }}
//             className="text text_type_main-large"
//           >
//             Булки
//           </p>
//           <div className="ingridients">
//             {buns.map((bun) => (
//               <BurgerIngridient ingridient={bun} key={bun._id} />
//             ))}
//           </div>
//           <p
//             style={{ paddingTop: "40px" }}
//             className="text text_type_main-large"
//           >
//             Соусы
//           </p>
//           <div className="ingridients">
//             {sauces.map((sauce) => (
//               <BurgerIngridient ingridient={sauce} key={sauce._id} />
//             ))}
//           </div>
//           <p
//             style={{ paddingTop: "40px" }}
//             className="text text_type_main-large"
//           >
//             Начинки
//           </p>
//           <div className="ingridients">
//             {mains.map((main) => (
//               <BurgerIngridient ingridient={main} key={main._id} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BurgerIngridients;
