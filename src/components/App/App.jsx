import React from "react";
import styles from "./app.module.css";
import Header from "../header/Header";
import BurgerIngredients from "../Burger-ingridients/BurgerIngridients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { apiConfig, parseResponse } from "../API/api";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState([]);

  function getState() {
    fetch(`${apiConfig.url}`)
      .then(parseResponse)
      .then((json) => {
        setState(json.data);
      })
      .catch((er) => console.log(er));
  }

  useEffect(() => {
    getState();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.app__flexComponents}>
        <BurgerIngredients ingredients={state} />
        <BurgerConstructor ingredients={state} />
      </main>
    </>
  );
}

export default App;
