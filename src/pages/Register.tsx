import styles from "./register.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/actions/user";

import { TUser } from "../services/types";
import { useDispatchHook } from "../services/types/index";

const Register = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailinput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatchHook();

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: TUser = {
      email: emailInput,
      password: passwordInput,
      name: nameInput,
    };
    dispatch(registerUser(user));
    history.replace({ pathname: "/" });
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
            name="password-input"
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
};

export default Register;
