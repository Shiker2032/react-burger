import {
  GET_INGREDIENTS,
  INCREMENT_INGREDIENT,
  RESET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SUBTRACT_INGREDIENT_AMOUNT,
} from "../types";

const ingredientsInitialState = {
  ingredients: [],
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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

export const currentIngredientReducer = (
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
