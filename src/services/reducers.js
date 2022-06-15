import { combineReducers } from "redux";
import {
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  SET_BUN,
  SET_ORDER_NUMBER,
} from "./types";
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
      const ingredient = action.ingredient;
      ingredient.amount = 1;
      return [...state, ingredient];
    }

    case "RESET_ORDER": {
      state = [{ price: 0 }];
      return state;
    }
    case REMOVE_INGREDIENT: {
      return [
        ...state.filter(
          (el) => el._id !== action.ingredient._id && el.price > 0
        ),
      ];
    }

    case SET_BUN: {
      const arr = state.filter((el) => el.type !== "bun");
      const bun = action.ingredient;
      bun.amount = 1;
      arr.push(bun);
      return [...arr];
    }

    case REORDER_ITEMS: {
      return [...action.data];
    }

    case "INCREMENT_INGREDIENT": {
      const ingredient = action.ingredient;
      ingredient.amount = ingredient.amount + 1;
      return [...state, ingredient];
    }

    case "SUBTRACT_INGREDIENT_AMOUNT": {
      const ingredient = action.ingredient;
      ingredient.amount = ingredient.amount - 1;
      return [...state, ingredient];
    }

    case "SUBTRACT_BUN_AMOUNT": {
      state.filter((el) => {
        el.amount = 0;
      });
      return [...state];
    }

    default:
      return state;
  }
};

const orderNumberReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_ORDER_NUMBER: {
      return (state = action.orderNumber);
    }
    default:
      return state;
  }
};

const initialPriceState = {
  ingredientPrice: 0,
  bunPrice: 0,
};

const priceReducer = (state = initialPriceState, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT_PRICE": {
      return {
        ...state,
        ingredientPrice: state.ingredientPrice + action.price,
      };
    }
    case "SUBTRACT_INGREDIENT_PRICE": {
      return {
        ...state,
        ingredientPrice: state.ingredientPrice - action.price,
      };
    }

    case "ADD_BUN_PRICE": {
      return {
        ...state,
        bunPrice: action.price,
      };
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
  price: priceReducer,
});

export { rootReducer };
