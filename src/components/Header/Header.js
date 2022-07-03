import styles from "../Header/header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink } from "react-router-dom";

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

        <NavLink to="/profile" className={`${styles.header__menuItemLink} p-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
