import React from "react";
import "./App.css";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import BurgerIngridients from "./components/burger-ingridients/BurgerIngridients";
import Header from "./components/header/Header";
import Tabs from "./components/Tabs";
import { useState, useEffect } from "react";

const objAdd = {
  _id: "60666c42cc7b410027a1a9b8",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
};

function App() {
  const [state, setState] = useState([
    {
      _id: "",
      name: "",
      type: "",
      proteins: 0,
      fat: 0,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
  ]);

  console.log(state);

  function changeState() {
    setState([...state, objAdd]);
  }

  function getState() {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => res.json())
      .then((json) => {
        setState(json.data);
      });
  }

  useEffect(() => {
    getState();
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <div className="content">
          <BurgerIngridients data={state} />
          <BurgerConstructor data={state} />
        </div>
      </div>
    </>
  );
}

export default App;
