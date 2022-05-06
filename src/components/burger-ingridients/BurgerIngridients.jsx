import React from "react";
import Tabs from "../Tabs";
import BurgerIngridient from "../burger-ingridient/BurgerIngridient";

function BurgerIngridients({ data }) {
  return (
    <>
      <div className="burgerIngridients">
        <p className="text text_type_main-large">Соберите бургер</p>
        <Tabs />
        <div className="ingridients">
          {data.map((ingridient) => {
            return <BurgerIngridient ingridient={ingridient} />;
          })}
        </div>
      </div>
    </>
  );
}

export default BurgerIngridients;
