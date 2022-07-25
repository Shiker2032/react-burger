import styles from "../Header/header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const AppHeader = () => {
  const history = useHistory();

  const [constructorIsActive, orderFeedIsActive, profileIsActive] = useSelector(
    (store) => [
      store.activeReducer.constructor,
      store.activeReducer.orderFeed,
      store.activeReducer.profile,
    ]
  );

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.header__nav}>
        <Link to="/" className={`${styles.header__menuItemLink} p-5`} href="#">
          <BurgerIcon type={constructorIsActive ? "primary" : "secondary"} />
          <p
            className={`text text_type_main-default ${
              constructorIsActive ? "" : "text_color_inactive"
            } ml-2`}
          >
            Констркутор
          </p>
        </Link>
        <Link
          to="/feed"
          className={`${styles.header__menuItemLink} p-5`}
          href="#"
        >
          <ListIcon type="secondary" />
          <p
            className={`text text_type_main-default ${
              orderFeedIsActive ? "" : "text_color_inactive"
            }  ml-2`}
          >
            Лента заказов
          </p>
        </Link>
        <div className={styles.header__logo}>
          <Logo />
        </div>

        <a
          onClick={() => {
            history.push({ pathname: "/profile" });
          }}
          to="/profile"
          className={`${styles.header__menuItemLink} p-5`}
        >
          <ProfileIcon type={profileIsActive ? "primary" : "secondary"} />
          <p
            className={`text text_type_main-default ${
              profileIsActive ? "" : "text_color_inactive"
            } ml-2`}
          >
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
