import styles from "./forgotPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Header from "../components/Header/Header";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { parseResponse } from "../components/API/api";

function ForgotPassword(props) {
  const history = useHistory();
  const [emailInput, setEmailinput] = useState("");

  const resetPasswordClick = () => {
    fetch(" https://norma.nomoreparties.space/api/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
      }),
    }).then((res) => {
      parseResponse(res);
      if (res.ok) {
        history.replace({ pathname: "/reset-password" });
      }
    });
  };
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.body}>
          <p className="text text_type_main-default mb-6">
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
            <Button type="primary" onClick={resetPasswordClick} size="medium">
              Восстановить
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Вспомнили пароль?
            <NavLink className={styles.link} to="/login">
              Войти
            </NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default ForgotPassword;
