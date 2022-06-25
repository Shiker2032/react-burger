import styles from "./forgotPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Header from "../components/Header/Header";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function ForgotPassword(props) {
  const [emailInput, setEmailinput] = useState("");
  return (
    <>
      <Header />
      <main className={styles.login__wrapper}>
        <div className={styles.login__body}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className="pb-6">
            <Input
              type="email"
              onChange={(e) => setEmailinput(e.target.value)}
              value={emailInput}
              placeholder="Укажите e-mail"
            />
          </div>
          <div>
            <Button type="primary" size="small ">
              Восстановить
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Вспомнили пароль?
            <NavLink className={styles.login__link} to="/">
              Войти
            </NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default ForgotPassword;
