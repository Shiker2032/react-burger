import { combineReducers } from "redux";
import {
  ADD_BUN_PRICE,
  ADD_INGREDIENT_PRICE,
  INCREMENT_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  RESET_INGREDIENTS,
  RESET_ORDER,
  RESET_TAB_STATE,
  RESET_USER,
  SET_BUN,
  SET_ORDER_NUMBER,
  SET_TAB_STATE,
  SET_USER,
  SUBTRACT_BUN_AMOUNT,
  SUBTRACT_INGREDIENT_AMOUNT,
  SUBTRACT_INGREDIENT_PRICE,
} from "./types";
import { GET_INGREDIENTS, SET_CURRENT_INGREDIENT, SET_ORDER } from "./types";

const ingredientsInitialState = {
  ingredients: [],
};

const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.data,
      };
    }

    case RESET_INGREDIENTS: {
      const arr = [...state.ingredients].map((el) => {
        el.amount = 0;
        return el;
      });
      return { ...state, ingredients: arr };
    }

    case INCREMENT_INGREDIENT: {
      const ingredient = action.ingredient;
      ingredient.amount = ingredient.amount + 1;
      return state;
    }

    case SUBTRACT_INGREDIENT_AMOUNT: {
      const ingredient = action.ingredient;
      state.ingredients
        .filter((el) => el.name === ingredient.name)
        .map((el) => {
          el.amount = el.amount - 1;
        });
      return state;
    }
    default:
      return state;
  }
};

const currentIngredientInitialState = {
  currentIngredient: { price: 0 },
};

const currentIngredientReducer = (
  state = currentIngredientInitialState,
  action
) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: action.currentIngredient };
    }
    default: {
      return state;
    }
  }
};

const orderInitialState = {
  order: [{ price: 0 }],
};

const orderReducer = (state = orderInitialState, action) => {
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

const orderNumberReducer = (state = orderNumberInitialState, action) => {
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

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  requestAttempt: 0,
};
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.authenticated,
      };
    }
    case RESET_USER: {
      state = initialAuthState;
    }
    default: {
      return state;
    }
  }
};

const initialActiveState = {
  constructor: false,
  orderFeed: false,
  profile: false,
};

const activeReducer = (state = initialActiveState, action) => {
  switch (action.type) {
    case SET_TAB_STATE: {
      return { ...state, [action.name]: true };
    }
    case RESET_TAB_STATE: {
      return (state = initialActiveState);
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  ingredientsReducer,
  currentIngredientReducer,
  orderReducer,
  orderNumberReducer,
  priceReducer,
  authReducer,
  activeReducer,
});

export { rootReducer };
