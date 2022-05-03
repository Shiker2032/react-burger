import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Header() {
  return (
    <div className="header">
      <div className="header__header-item">
        <BurgerIcon type="primary" />
        <p className="text text_type_main-default">Конструктор</p>
      </div>
      <div className="header__header-item">
        <ListIcon type="primary" />
        <p className="text text_type_main-default">Лента заказов</p>
      </div>
      <div className="header__header-item">
        <Logo />
      </div>
      <div className="header__header-item">
        <ProfileIcon type="primary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </div>
  );
}
