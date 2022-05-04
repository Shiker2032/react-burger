import React from "react";
import BurgerIngridient from "./BurgerIngridient";
import {
  Tab,
  ConstructorElement,
  CurrencyIcon,
  Button,
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
        <div className="constructor-wrapper">
          <div className="constructor">
            <div className="burger-components">
              {data.map((element, idx) => {
                return (
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                );
              })}
            </div>
          </div>
          <div className="order-info">
            <p className="text text_type_digits-medium">1238</p>
            <CurrencyIcon type="primary" />
            <Button type="primary" size="medium">
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
