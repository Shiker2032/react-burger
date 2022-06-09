import { combineReducers } from "redux";
import { SET_ORDER_NUMBER } from "./types";
import {
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
} from "./types";

const inititialState = [{}];

const ingredientsReducer = (state = inititialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return [...state, ...action.data];
    }
    default:
      return state;
  }
};

const currentIngredientReducer = (state = { price: 0 }, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return { ...state, ...action.currentIngredient };
    }
    default: {
      return state;
    }
  }
};

const orderReducer = (state = [{ price: 0 }], action) => {
  switch (action.type) {
    case SET_ORDER: {
      return [...state, action.ingredient];
    }
    default:
      return state;
  }
};

const orderNumberReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_ORDER_NUMBER: {
      console.log(action);
      return (state = action.orderNumber);
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  orderNumber: orderNumberReducer,
});

export { rootReducer };
