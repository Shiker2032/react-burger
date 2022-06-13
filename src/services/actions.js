import {
  GET_INGREDIENTS,
  RESET_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  SET_ORDER_NUMBER,
} from "./types";
import { apiConfig, parseResponse } from "../components/API/api";

const getIngredients = () => (dispatch) => {
  fetch(`${apiConfig.url}/ingredients`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_INGREDIENTS,
        data: data.data,
      });
    })
    .catch((er) => console.log(er));
};

const setCurrentIngredient = (currentIngredient) => {
  return {
    type: SET_CURRENT_INGREDIENT,
    currentIngredient: currentIngredient,
  };
};

const setOrder = (ingredient) => {
  return {
    type: SET_ORDER,
    ingredient: ingredient,
  };
};

const setOrderNumber = (number) => {
  return {
    type: SET_ORDER_NUMBER,
    orderNumber: number,
  };
};

const resetItem = (dragIndex, hoverIndex) => {
  return {
    type: RESET_INGREDIENT,
    dragIndex,
    hoverIndex,
  };
};

export {
  getIngredients,
  setCurrentIngredient,
  setOrder,
  setOrderNumber,
  resetItem,
};
