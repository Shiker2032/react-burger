import styles from "./login.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWithRefresh,
  logInUser,
  logInUserAPI,
  setUser,
} from "../services/actions";

function Login(props) {
  const [emailInput, setEmailinput] = useState("vladislav.begunov@mail.ru");
  const [passwordInput, setPasswordInput] = useState("qwer123");

  const history = useHistory();
  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const loginClick = () => {
    const user = { email: emailInput, password: passwordInput };
    dispatch(
      logInUser("https://norma.nomoreparties.space/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
    );
  };

  useEffect(() => {
    dispatch({ type: "RESET_TAB_STATE" });
  }, []);

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
        </div>
      </main>
    </>
  );
}

export default Login;

// {success: true, user: {email: "vladislav.begunov@mail.ru", name: "Vlad"},…}
// accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzE2M2Q1NDJkMzRhMDAxYzI3M2NkNiIsImlhdCI6MTY1Njg0MTE3MywiZXhwIjoxNjU2ODQyMzczfQ.sam_JnrUhMu8Yt4-E-GGPRY8aqplA2HMUnWHZ0Na5Xk"
// refreshToken: "14d808c6df9944600db6aea9d76c023060a6fc41ef65a3e8fc3577573c8fea400af844613881413c"
// success: true
// user: {email: "vladislav.begunov@mail.ru", name: "Vlad"}
