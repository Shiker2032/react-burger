import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Profile(props) {
  const [nameInput, setNameInput] = useState("");
  const [loginInput, setLoginIput] = useState("");
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className="pr-15">
          <p className="text text_type_main-medium text_color_inactive pb-6">
            Профиль
          </p>
          <p className="text text_type_main-medium text_color_inactive pb-6">
            История заказов
          </p>
          <p className="text text_type_main-medium text_color_inactive pb-20">
            Выход
          </p>
          <p
            className="text text_type_main-small text_color_inactive "
            style={{ opacity: "0.4" }}
          >
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        </div>
        <div className={styles.body}>
          <div className="pb-6">
            <Input
              type="text"
              onChange={(e) => setNameInput(e.target.value)}
              value={nameInput}
              placeholder="Имя"
            />
          </div>
          <div className="pb-6">
            <Input
              type="text"
              onChange={(e) => setLoginIput(e.target.value)}
              value={loginInput}
              placeholder="Логин"
            />
          </div>
          <PasswordInput />
        </div>
      </main>
    </>
  );
}

export default Profile;
