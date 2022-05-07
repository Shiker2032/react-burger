import React from "react";
import styles from "../header/Header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.header__nav}>
        <a className={`${styles.header__menuItemLink} p-5`} href="#">
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </a>
        <a className={`${styles.header__menuItemLink} p-5`} href="#">
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </p>
        </a>
        <a className={styles.header__logo}>
          <Logo />
        </a>
        <a className={`${styles.header__menuItemLink} p-5`} href="#">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
