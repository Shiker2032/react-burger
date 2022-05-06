import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructor({ data }) {
  return (
    <>
      <div className="burgerSelect">
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

export default BurgerConstructor;
