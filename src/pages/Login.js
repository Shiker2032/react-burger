import styles from "./login.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const [emailInput, setEmailinput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <>
      <Header />

      <main className={styles.login__wrapper}>
        <div className={styles.login__body}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <div className="pb-6">
            <Input
              type="email"
              onChange={(e) => setEmailinput(e.target.value)}
              value={emailInput}
              placeholder="E-mail"
            />
          </div>
          <PasswordInput />
          <div className="pt-6">
            <Button type="primary" size="small ">
              Войти
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Вы — новый пользователь?{" "}
            <NavLink className={styles.login__link} to="/">
              зарегистрироваться
            </NavLink>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{" "}
            <NavLink className={styles.login__link} to="/">
              Восстановить пароль
            </NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;
