import styles from "./forgotPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Header from "../components/Header/Header";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { apiConfig, getCookie, parseResponse } from "../components/API/api";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/actions";

function ResetPassword(props) {
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const resetPasswordClick = async () => {
    const res = await dispatch(
      resetPassword(`${apiConfig.url}/password-reset/reset`, {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + codeInput,
        },
        method: "POST",
        body: JSON.stringify({
          password: passwordInput,
          token: codeInput,
        }),
      })
    );
    if (res.ok) {
      history.replace({ pathname: "/login" });
    }
  };

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.body}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className="pb-6">
            <PasswordInput
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
          <div className="pb-6">
            <Input
              type="text"
              onChange={(e) => setCodeInput(e.target.value)}
              value={codeInput}
              placeholder="Введите код из письма"
            />
          </div>
          <div>
            <Button type="primary" onClick={resetPasswordClick} size="small ">
              Сохранить
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Вспомнили пароль?
            <NavLink className={styles.link} to="/">
              Войти
            </NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
