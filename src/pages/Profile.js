import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchUser } from "../services/actions";
import { getCookie } from "../components/API/api";

function Profile(props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setNameInput(auth.user.name);
    setemailInput(auth.user.email);
  });

  const confirmChangesClick = () => {
    let inputData = {
      name: nameInput ? nameInput : auth.user.name,
      email: emailInput ? emailInput : auth.user.email,
    };
    dispatch(patchUser(inputData, auth));
  };
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className="pr-15">
          <p className="text text_type_main-medium text_color_inactive pb-6">
            Профиль
          </p>
          <p className="text text_type_main-medium text_color_inactive pb-6">
            История заказов
          </p>
          <p className="text text_type_main-medium text_color_inactive pb-20">
            Выход
          </p>
          <p
            className="text text_type_main-small text_color_inactive "
            style={{ opacity: "0.4" }}
          >
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        </div>
        <div className={styles.body}>
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
              type="text"
              onChange={(e) => setemailInput(e.target.value)}
              value={emailInput}
              placeholder="Email"
            />
          </div>
          <PasswordInput
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <Button onClick={confirmChangesClick}>применить</Button>
      </main>
    </>
  );
}

export default Profile;
