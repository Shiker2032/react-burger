import styles from "./forgotPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { parseResponse } from "../components/API/api";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../services/actions/user";

function ForgotPassword(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailInput, setEmailinput] = useState("");
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = await forgotPassword(emailInput);
    if (message.success)
      history.replace({ pathname: "/reset-password", from: location });
  };
  return (
    <>
      <main className={styles.wrapper}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.body}>
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
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Вспомнили пароль?
            <NavLink className={styles.link} to="/login">
              Войти
            </NavLink>
          </p>
        </form>
      </main>
    </>
  );
}

export default ForgotPassword;
