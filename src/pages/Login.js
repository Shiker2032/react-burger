import styles from "./login.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, setUser } from "../services/actions";

function Login(props) {
  const [emailInput, setEmailinput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const history = useHistory();
  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const loginClick = () => {
    dispatch(logInUser({ email: emailInput, password: passwordInput }));
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.body}>
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
            value={passwordInput}
            onChange={(evt) => setPasswordInput(evt.target.value)}
          />
          <div className="pt-6">
            <Button type="primary" onClick={loginClick} size="small ">
              Войти
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
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
        </div>
      </main>
    </>
  );
}

export default Login;
