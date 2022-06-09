import { combineReducers } from "redux";
import {
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
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

const orderReducer = (state = [{}], action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return;
    }
  }
};

const currentIngredientReducer = (state = { price: 0 }, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      console.log(action.currentIngredient);
      return { ...state, ...action.currentIngredient };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentIngredient: currentIngredientReducer,
});

export { rootReducer };
