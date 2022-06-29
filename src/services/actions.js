import {
  GET_INGREDIENTS,
  RESET_INGREDIENT,
  RESET_INGREDIENTS,
  RESET_ORDER,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  SET_ORDER_NUMBER,
} from "./types";
import {
  apiConfig,
  getCookie,
  parseResponse,
  setCookie,
} from "../components/API/api";

const getIngredients = () => (dispatch) => {
  fetch(`${apiConfig.url}/ingredients`)
    .then((res) => parseResponse(res))
    .then((data) => {
      data.data.forEach((el) => {
        el.amount = 0;
      });
      dispatch({
        type: GET_INGREDIENTS,
        data: data.data,
      });
    })
    .catch((er) => console.log(er));
};

export const postOrder = (orderInfo, modalHendler) => (dispatch) => {
  fetch(`${apiConfig.url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
};

export const logInUser = (user) => (dispatch) => {
  fetch("https://norma.nomoreparties.space/api/auth/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(user),
  }).then((res) => {
    let authToken;
    res.headers.forEach((header) => {
      parseResponse(res);
      if (header.indexOf("Bearer") === 0) {
        authToken = header.split("Bearer")[1];
      }
    });
    if (authToken) {
      setCookie("token", authToken);
    }
    if (res.ok) {
      dispatch(setUser(user));
    }
  });
};

const setCurrentIngredient = (currentIngredient) => {
  return {
    type: SET_CURRENT_INGREDIENT,
    currentIngredient: currentIngredient,
  };
};

const setOrder = (ingredient, uid) => {
  return {
    type: SET_ORDER,
    ingredient: ingredient,
    uid: uid,
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

const setUser = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export {
  getIngredients,
  setCurrentIngredient,
  setOrder,
  setOrderNumber,
  resetItem,
  setUser,
};
