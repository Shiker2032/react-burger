import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Button,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Button type="primary" size="medium">
      Я кнопка из UI системы Yandex
    </Button>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
