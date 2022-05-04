import React from "react";
import BurgerIngridient from "./BurgerIngridient";
import {
  Tab,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngridients({ data }) {
  return (
    <>
      <div className="burgerSelect">
        <div className="burgerIngridients">
          {data.map((bun) => {
            return <BurgerIngridient bun={bun} />;
          })}
        </div>
        <div className="constructor">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />
        </div>
      </div>
    </>
  );
}
