import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";

function Tabs({ tabRefs }) {
  const bunTab = useRef(null);
  const [current, setCurrent] = React.useState("one");

  useEffect(() => {
    setCurrent("bun");
  }, []);

  return (
    <div className={styles.burgerIngredients__tabList}>
      <Tab
        value="bun"
        active={current === "bun"}
        onClick={() => {
          setCurrent("bun");
          tabRefs.bunRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Булки
      </Tab>

      <Tab
        value="sauce"
        active={current === "sauce"}
        onClick={() => {
          setCurrent("sauce");
          tabRefs.saucesRef.current.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        Соусы
      </Tab>

      <Tab
        value="main"
        active={current === "main"}
        onClick={() => {
          setCurrent("main");
          tabRefs.ingredientsRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Начинки
      </Tab>
    </div>
  );
}

Tabs.propTypes = {
  tabRefs: PropTypes.object.isRequired,
};

export default Tabs;
