import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerConstructor({ data }) {
  return (
    <>
      <section className="burgerSelect">
        <ul className="constructor-wrapper">
          <li className="constructor">
            {data.map((element, idx) => {
              return (
                <>
                  <article className="burger-components">
                    <p>
                      <DragIcon type="primary" />
                    </p>
                    <ConstructorElement
                      key={element._id}
                      type="top"
                      isLocked={false}
                      text={element.name}
                      price={element.price}
                      thumbnail={element.image}
                    />
                  </article>
                </>
              );
            })}
          </li>
          <div className="order-info">
            <div className="order-info__price">
              <p className="text text_type_digits-medium">1238</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="medium">
              Оформить заказ
            </Button>
          </div>
        </ul>
      </section>
    </>
  );
}

export default BurgerConstructor;
