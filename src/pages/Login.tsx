import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Redirect, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { logInUser } from "../services/actions/user";
import styles from "./login.module.css";
import { resetTab } from "../services/actions/tabs";
import { useDispatchHook, useSelectorHook } from "../services/types/index";
import { Button } from "../components/Button";

function Login() {
  const [emailInput, setEmailinput] = useState("vladislav.begunov@mail.ru");
  const [passwordInput, setPasswordInput] = useState("qwer123");

  const auth = useSelectorHook((store) => store.authReducer);
  const dispatch = useDispatchHook();
  const location = useLocation<any>();

  useEffect(() => {
    dispatch(resetTab());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email: emailInput, password: passwordInput };
    dispatch(logInUser(user));
  };

  if (auth.isAuthenticated) {
    return <Redirect to={location.state?.from.pathname || "/"} />;
  }

  return (
    <>
      <main className={styles.wrapper}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.body}>
          <p className="text text_type_main-medium mb-6">Вход</p>
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
            <Button type="primary" size="small" htmlType="submit">
              Войти
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20 pb-4">
            Вы — новый пользователь?
            <NavLink className={styles.link} to="/register">
              зарегистрироваться
            </NavLink>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <NavLink className={styles.link} to="/forgot-password">
              Восстановить пароль
            </NavLink>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;
