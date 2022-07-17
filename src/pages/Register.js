import styles from "./register.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/actions/user";
import { useDispatch } from "react-redux";

function Register(props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailinput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailInput,
      password: passwordInput,
      name: nameInput,
    };
    const message = await dispatch(registerUser(user, history));
    if (message && message.success) history.replace({ pathname: "/" });
  };

  return (
    <>
      <main className={styles.wrapper}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.body}>
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
            <Button type="primary" size="medium">
              зарегистрироваться
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Уже зарегистрированы?
            <NavLink className={styles.link} to="/login">
              Войти
            </NavLink>
          </p>
        </form>
      </main>
    </>
  );
}

export default Register;
