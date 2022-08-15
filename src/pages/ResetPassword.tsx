import styles from "./forgotPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FormEvent, useState } from "react";
import { resetPassword } from "../services/actions/user";

function ResetPassword() {
  const [passwordInput, setPasswordInput] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const history = useHistory();
  const location: any = useLocation();

  if (location.from?.pathname !== "/forgot-password") {
    history.replace({ pathname: "/forgot-password" });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputData = {
      password: passwordInput,
      token: codeInput,
    };
    const res = await resetPassword(inputData);
    if (res && res.ok) {
      history.replace({ pathname: "/login" });
    }
  };

  return (
    <>
      <main className={styles.wrapper}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.body}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className="pb-6">
            <PasswordInput
              name="password-input"
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
            <Button type="primary" size="small">
              text
            </Button>
          </div>
          <p className="text text_type_main-default text_color_inactive pt-20">
            Вспомнили пароль?
            <NavLink className={styles.link} to="/">
              Войти
            </NavLink>
          </p>
        </form>
      </main>
    </>
  );
}

export default ResetPassword;
