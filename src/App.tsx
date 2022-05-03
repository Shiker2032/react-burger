import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  return (
    <div className="header">
      <div className="header__header-group">
        <div className="header__header-item">
          <BurgerIcon type="primary" />
          <p>Конструктор</p>
        </div>
        <div className="header__header-item">
          <ListIcon type="primary" />
          <p>Лента заказов</p>
        </div>
      </div>
      <div className="header__header-item">
        <Logo />
      </div>
      <div className="header__header-item">
        <ProfileIcon type="primary" />
        <p>Личный кабинет</p>
      </div>
    </div>
  );
}

export default App;
