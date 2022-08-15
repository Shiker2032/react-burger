import { apiConfig, getCookie } from "../../components/API/api";
import { parseResponse } from "../../utils/utils";
import {
  RESET_INGREDIENT,
  RESET_INGREDIENTS,
  RESET_ORDER,
  SET_ORDER,
  SET_ORDER_NUMBER,
} from "../types";

export const postOrder = (orderInfo, modalHendler) => (dispatch) => {
  try {
    fetch(`${apiConfig.url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: orderInfo,
      }),
    })
      .then((res) => parseResponse(res))
      .then((json) => {
        dispatch(setOrderNumber(json.order.number));
        modalHendler(true);
        dispatch({ type: RESET_ORDER });
        dispatch({ type: RESET_INGREDIENTS });
      })
      .catch((er) => console.log(er));
  } catch (err) {
    console.log(err);
  }
};

export const setOrder = (ingredient, uid) => {
  return {
    type: SET_ORDER,
    ingredient: ingredient,
    uid: uid,
  };
};

export const setOrderNumber = (number) => {
  return {
    type: SET_ORDER_NUMBER,
    orderNumber: number,
  };
};

export const resetItem = (dragIndex, hoverIndex) => {
  return {
    type: RESET_INGREDIENT,
    dragIndex,
    hoverIndex,
  };
};
