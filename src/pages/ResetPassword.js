import styles from "./forgotPassword.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Header from "../components/Header/Header";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function ResetPassword(props) {
  const [code, setCode] = useState(null);
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.body}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className="pb-6">
            <PasswordInput />
          </div>
          <div className="pb-6">
            <Input
              type="text"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              placeholder="Введите код из письма"
            />
          </div>
          <div>
            <Button type="primary" size="small ">
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
