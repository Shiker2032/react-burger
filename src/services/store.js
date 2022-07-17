import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers/root";
import thunk from "redux-thunk";
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export { store };
