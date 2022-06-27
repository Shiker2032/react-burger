import styles from "./register.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { parseResponse } from "../components/API/api";

function Register(props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailinput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const history = useHistory();

  const registerClick = () => {
    register();
  };

  const register = () => {
    fetch("https://norma.nomoreparties.space/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        name: nameInput,
      }),
    }).then((res) => {
      parseResponse(res);
      console.log(res);
      if (res.ok) {
        history.replace({ pathname: "/login" });
      }
    });
  };
  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <div className={styles.body}>
          <p className="text text_type_main-medium mb-6">Регистрация</p>
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
              type="email"
              onChange={(e) => setEmailinput(e.target.value)}
              value={emailInput}
              placeholder="E-mail"
            />
          </div>
          <PasswordInput
            value={passwordInput}
            onChange={(evt) => setPasswordInput(evt.target.value)}
          />
          <div className="pt-6">
            <Button type="primary" onClick={registerClick} size="small">
              зарегистрироваться
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Уже зарегистрированы?
            <NavLink className={styles.link} to="/">
              Войти
            </NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;
