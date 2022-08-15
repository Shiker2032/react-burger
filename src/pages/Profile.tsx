import styles from "./profile.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { logOutUser, patchUser } from "../services/actions/user";

import { useHistory } from "react-router-dom";
import { resetTab, setTab } from "../services/actions/tabs";
import { useDispatchHook, useSelectorHook } from "../services/types/index";
import { TUser } from "../services/types";

function Profile() {
  const auth = useSelectorHook((store) => store.authReducer);
  const [nameInput, setNameInput] = useState(
    auth?.user?.name ? auth?.user?.name : ""
  );
  const [emailInput, setemailInput] = useState(
    auth?.user?.email ? auth?.user?.email : ""
  );
  const [passwordInput, setPasswordInput] = useState("");

  const [profileIsActive, setProfileIsActive] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);

  const dispatch = useDispatchHook();
  const history = useHistory();

  useEffect(() => {
    setDefaultInput();
    dispatch(resetTab());
    dispatch(setTab("profile"));
    setProfileIsActive(true);
  }, []);

  const setDefaultInput = () => {
    setApplyVisible(false);
    setNameInput(auth?.user?.name ? auth?.user?.name : "");
    setemailInput(auth?.user?.email ? auth?.user?.email : "");
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    inputSetter(e.target.value);
    setApplyVisible(true);
  };

  const orderHistoryClick = () => {
    history.push({ pathname: "/profile/orders" });
  };

  const logOutClick = () => {
    dispatch(logOutUser());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputData: TUser = {
      name: nameInput ? nameInput : auth?.user?.name,
      email: emailInput ? emailInput : auth?.user?.email,
    };

    dispatch(patchUser(inputData));
    setApplyVisible(false);
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
          <p
            style={{ cursor: "pointer" }}
            onClick={orderHistoryClick}
            className="text text_type_main-medium text_color_inactive pb-6"
          >
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
            name="password-input"
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
