import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngridient({ bun }) {
  return (
    <div>
      <img
        className="BurgerIngridient__BurgerIngridient-image"
        src={bun.image}
        alt=""
      />
      <p className="text text_type_digits-default">
        {bun.price} <CurrencyIcon type="secondary" />
      </p>
      <p className="text text_type_main-large">{bun.name}</p>
    </div>
  );
}
