import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers/root";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from "./actions/wsActions";
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware("wss://norma.nomoreparties.space/orders/all", wsActions)
  )
);

const store = createStore(rootReducer, enhancer);

export { store };
