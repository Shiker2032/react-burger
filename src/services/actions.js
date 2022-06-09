import { GET_INGREDIENTS, SET_CURRENT_INGREDIENT } from "./types";
import { apiConfig, parseResponse } from "../components/API/api";

const getIngredientsAPI = () => (dispatch) => {
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

export { getIngredientsAPI, setCurrentIngredient };
