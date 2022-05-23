import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";

export default function Tabs() {
  const [current, setCurrent] = React.useState("one");
  return (
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
  );
}
