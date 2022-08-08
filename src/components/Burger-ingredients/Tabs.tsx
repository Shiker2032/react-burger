import React, {
  FC,
  HtmlHTMLAttributes,
  MutableRefObject,
  useEffect,
} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burgerIngredients.module.css";

type TTabs = {
  tabRefs: {
    [key: string]: {
      current: any;
    };
  };
};

const Tabs: FC<TTabs> = ({ tabRefs }) => {
  const [current, setCurrent] = React.useState("one");

  useEffect(() => {
    setCurrent("bun");

    const saucesTab = tabRefs.saucesRef.current;
    const bunsTab = tabRefs.bunRef.current;
    const ingredientsTab = tabRefs.ingredientsRef.current;

    const tabs: any = [saucesTab, bunsTab, ingredientsTab];

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0].target;
        if (target.textContent === "Соусы") {
          setCurrent("sauce");
        } else if (target.textContent === "Начинки") {
          setCurrent("main");
        } else {
          setCurrent("bun");
        }
      },
      {
        root: document.querySelector("view"),
        threshold: 1,
      }
    );

    tabs.forEach((tabEl: any) => {
      observer.observe(tabEl);
    });
  }, []);

  return (
    <div id={"view"} className={styles.burgerIngredients__tabList}>
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
};

export default Tabs;
