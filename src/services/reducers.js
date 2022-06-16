import { combineReducers } from "redux";
import {
  ADD_BUN_PRICE,
  ADD_INGREDIENT_PRICE,
  INCREMENT_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  RESET_INGREDIENTS,
  RESET_ORDER,
  SET_BUN,
  SET_ORDER_NUMBER,
  SUBTRACT_BUN_AMOUNT,
  SUBTRACT_INGREDIENT_AMOUNT,
  SUBTRACT_INGREDIENT_PRICE,
} from "./types";
import { GET_INGREDIENTS, SET_CURRENT_INGREDIENT, SET_ORDER } from "./types";

const ingredientsReducer = (state = [{}], action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return [...state, ...action.data];
    }

    case RESET_INGREDIENTS: {
      const arr = [...state].map((el) => {
        el.amount = 0;
        return el;
      });
      return arr;
    }

    case INCREMENT_INGREDIENT: {
      const ingredient = action.ingredient;
      ingredient.amount = ingredient.amount + 1;
      return state;
    }

    case SUBTRACT_INGREDIENT_AMOUNT: {
      const ingredient = action.ingredient;
      const ingredientVar = state.filter((el) => el.name === ingredient.name);
      ingredientVar.map((el) => {
        el.amount = el.amount - 1;
      });
      return state;
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
      const ingredeint = { ...action.ingredient };

      ingredeint.uid = action.uid;
      return [...state, ingredeint];
    }

    case RESET_ORDER: {
      state = [{ price: 0 }];
      return state;
    }

    case REMOVE_INGREDIENT: {
      return state.filter((el) => el.uid !== action.ingredient.uid);
    }

    case SET_BUN: {
      const arr = state.filter((el) => el.type !== "bun");
      const bun = action.ingredient;
      bun.amount = 1;
      arr.push(bun);
      return arr;
    }

    case REORDER_ITEMS: {
      return [...action.data];
    }

    case SUBTRACT_BUN_AMOUNT: {
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
    case ADD_INGREDIENT_PRICE: {
      return {
        ...state,
        ingredientPrice: state.ingredientPrice + action.price,
      };
    }
    case SUBTRACT_INGREDIENT_PRICE: {
      return {
        ...state,
        ingredientPrice: state.ingredientPrice - action.price,
      };
    }

    case ADD_BUN_PRICE: {
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
