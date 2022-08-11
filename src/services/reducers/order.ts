import { TBunActions } from "../actions/bun";
import { TIngredientActions } from "../actions/ingredient";
import { TOrderActions } from "../actions/order";
import {
  ADD_BUN_PRICE,
  ADD_INGREDIENT_PRICE,
  IIngredient,
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  RESET_ORDER,
  SET_BUN,
  SET_ORDER,
  SET_ORDER_NUMBER,
  SUBTRACT_BUN_AMOUNT,
  SUBTRACT_INGREDIENT_PRICE,
} from "../types";

type TOrderState = {
  order: Array<IIngredient>;
};

const orderInitialState: TOrderState = {
  order: [],
};

export const orderReducer = (
  state = orderInitialState,
  action: TOrderActions | TBunActions | TIngredientActions
) => {
  switch (action.type) {
    case SET_ORDER: {
      const ingredeint = { ...action.ingredient };
      ingredeint.uid = action.uid;
      return { ...state, order: [...state.order, ingredeint] };
    }

    case RESET_ORDER: {
      return (state = orderInitialState);
    }

    case SET_BUN: {
      console.log(state);

      const arr = state.order.filter((el) => el.type !== "bun");
      const bun = action.ingredient;
      bun.amount = 1;
      arr.push(bun);
      return {
        ...state,
        order: arr,
      };
    }

    case SUBTRACT_BUN_AMOUNT: {
      action.bun.amount = 0;
      return state;
    }

    case REMOVE_INGREDIENT: {
      return {
        ...state,
        order: state.order.filter((el) => el.uid !== action.ingredient.uid),
      };
    }

    case REORDER_ITEMS: {
      return {
        ...state,
        order: [...action.data],
      };
    }

    default:
      return state;
  }
};

const orderNumberInitialState = {
  orderNumber: 0,
};

export const orderNumberReducer = (
  state = orderNumberInitialState,
  action: TOrderActions
) => {
  switch (action.type) {
    case SET_ORDER_NUMBER: {
      return { ...state, orderNumber: action.orderNumber };
    }
    default:
      return state;
  }
};

const initialPriceState = {
  ingredientPrice: 0,
  bunPrice: 0,
};

export const priceReducer = (
  state = initialPriceState,
  action: TIngredientActions | TBunActions
) => {
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
