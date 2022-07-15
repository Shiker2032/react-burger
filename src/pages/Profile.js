import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, patchUser } from "../services/actions/user";
import { RESET_TAB_STATE, SET_TAB_STATE } from "../services/types";

function Profile(props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [profileIsActive, setProfileIsActive] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);

  const auth = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setDefaultInput();
    dispatch({ type: RESET_TAB_STATE });
    dispatch({ type: SET_TAB_STATE, name: "profile" });
    setProfileIsActive(true);
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
    dispatch(logOutUser());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputData = {
      name: nameInput ? nameInput : auth.user.name,
      email: emailInput ? emailInput : auth.user.email,
    };

    dispatch(patchUser(inputData));
  };

  return (
    <>
      <main className={styles.wrapper}>
        <div className="pr-15">
          <p
            className={`text text_type_main-medium ${
              !profileIsActive ? "text_color_inactive" : ""
            }  pb-6`}
          >
            Профиль
          </p>
          <p className="text text_type_main-medium text_color_inactive pb-6">
            История заказов
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={logOutClick}
            className="text text_type_main-medium text_color_inactive pb-20"
          >
            Выход
          </p>
          <p
            className="text text_type_main-small text_color_inactive "
            style={{ opacity: "0.4" }}
          >
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        </div>
        <form className={styles.body} onSubmit={(e) => handleSubmit(e)}>
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
              onChange={(e) => handleInput(e, setemailInput)}
              value={emailInput}
              placeholder="Email"
            />
          </div>
          <PasswordInput
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          {applyVisible && (
            <div className={styles.controls}>
              <Button htmlType="submit">применить</Button>
              <Button onClick={setDefaultInput}>Отмена</Button>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default Profile;
