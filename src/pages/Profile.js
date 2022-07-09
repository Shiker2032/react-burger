import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser, patchUser, setUser } from "../services/actions";
import { deleteCookie, getCookie } from "../components/API/api";

function Profile(props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [applyVisible, setApplyVisible] = useState(false);

  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setDefaultInput();
    dispatch({ type: "RESET_TAB_STATE" });
    dispatch({ type: "SET_TAB_STATE", name: "profile" });
  }, []);

  const setDefaultInput = () => {
    setNameInput(auth.user.name);
    setemailInput(auth.user.email);
    setApplyVisible(false);
  };

  const handleInput = (e, inputSetter) => {
    inputSetter(e.target.value);
    setApplyVisible(true);
  };

  const logOutClick = () => {
    dispatch(setUser(null));
    dispatch(logOutUser(localStorage.getItem("refreshToken")));
    deleteCookie("token");
    localStorage.clear();
    history.replace({ pathname: "/login" });
  };

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
      <Button onClick={logOutClick}>Выйти</Button>

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
              onChange={(e) => handleInput(e, setNameInput)}
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
        {applyVisible && (
          <div>
            <Button onClick={confirmChangesClick}>применить</Button>
            <Button onClick={setDefaultInput}>Отмена</Button>
          </div>
        )}
      </main>
    </>
  );
}

export default Profile;
