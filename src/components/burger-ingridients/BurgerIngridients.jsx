import React from "react";
import Tabs from "../Tabs";

import BurgerIngridient from "../burger-ingridient/BurgerIngridient";

function BurgerIngridients({ data }) {
  const buns = data.filter((data) => data.type == "bun");
  const sauces = data.filter((data) => data.type == "sauce");
  const mains = data.filter((data) => data.type == "main");
  return (
    <>
      <div className="burgerIngridients">
        <p className="text text_type_main-large">Соберите бургер</p>
        <Tabs />
        <div className="ingridientsConstuctor">
          <p
            style={{ paddingTop: "40px" }}
            className="text text_type_main-large"
          >
            Булки
          </p>
          <div className="ingridients">
            {buns.map((bun) => (
              <BurgerIngridient ingridient={bun} key={bun._id} />
            ))}
          </div>
          <p
            style={{ paddingTop: "40px" }}
            className="text text_type_main-large"
          >
            Соусы
          </p>
          <div className="ingridients">
            {sauces.map((sauce) => (
              <BurgerIngridient ingridient={sauce} key={sauce._id} />
            ))}
          </div>
          <p
            style={{ paddingTop: "40px" }}
            className="text text_type_main-large"
          >
            Начинки
          </p>
          <div className="ingridients">
            {mains.map((main) => (
              <BurgerIngridient ingridient={main} key={main._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BurgerIngridients;
