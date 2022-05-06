import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngridient({ ingridient }) {
  return (
    <div className="burgerIngridient">
      <img
        className="BurgerIngridient__BurgerIngridient-image"
        src={ingridient.image}
        alt=""
      />
      <p
        style={{ paddingBottom: "8px" }}
        className="text text_type_digits-default"
      >
        {ingridient.price} <CurrencyIcon type="secondary" />
      </p>
      <p className="text text_type_main-default">{ingridient.name}</p>
    </div>
  );
}
