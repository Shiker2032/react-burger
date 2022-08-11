import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers/root";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from "./actions/wsActions";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware("wss://norma.nomoreparties.space/orders", wsActions)
    )
  )
);

export { store };
