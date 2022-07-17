import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";

import { Provider } from "react-redux";
import { store } from "./services/store";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
