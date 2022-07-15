import { apiConfig } from "../../components/API/api";
import { GET_INGREDIENTS, SET_CURRENT_INGREDIENT } from "../types";

export const getIngredients = (order) => async (dispatch) => {
  const res = await fetch(`${apiConfig.url}/ingredients`);
  const data = await res.json();
  const ingredientsArr = data.data;

  ingredientsArr.forEach((ingredientEl) => {
    if (order) {
      order.forEach((orderEl) => {
        ingredientEl.amount = 0;
        if (orderEl._id === ingredientEl._id) {
          ingredientEl.amount = orderEl.amount;
        }
      });
    }
  });
  dispatch({ type: GET_INGREDIENTS, data: ingredientsArr });
};

export const setCurrentIngredient = (currentIngredient) => {
  return {
    type: SET_CURRENT_INGREDIENT,
    currentIngredient: currentIngredient,
  };
};
