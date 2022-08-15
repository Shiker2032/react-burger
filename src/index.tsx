import * as ReactDOM from "react-dom";
import App from "./components/App/App";

import { Provider } from "react-redux";
import { store } from "./services/store";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
