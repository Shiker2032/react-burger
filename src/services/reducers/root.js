import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { ingredientsReducer, currentIngredientReducer } from "./ingredient";
import { orderReducer, orderNumberReducer, priceReducer } from "./order";
import { activeReducer } from "./activeTab";
import { wsReducer } from "./wsReducer";

const rootReducer = combineReducers({
  ingredientsReducer,
  currentIngredientReducer,
  orderReducer,
  orderNumberReducer,
  priceReducer,
  authReducer,
  activeReducer,
  wsReducer,
});

export { rootReducer };
