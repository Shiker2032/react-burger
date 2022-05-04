import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          <li className={styles.navigation__item}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </li>
          <li className={styles.navigation__item}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </li>
          <li style={{ width: "280px" }} className={styles.navigation__item}>
            <Logo />
          </li>
          <li className={styles.navigation__item}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}
