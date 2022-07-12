import {
  GET_INGREDIENTS,
  RESET_INGREDIENT,
  RESET_INGREDIENTS,
  RESET_ORDER,
  RESET_USER,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  SET_ORDER_NUMBER,
  SET_USER,
} from "./types";
import {
  apiConfig,
  deleteCookie,
  parseResponse,
  setCookie,
} from "../components/API/api";

import { checkResponse } from "../components/API/api";

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse(res);

    return data;
  } catch (err) {
    if (err === "jwt expired") {
      const refreshRes = await refreshUser(localStorage.refreshToken);
      const refreshData = await checkResponse(refreshRes);

      setCookie("token", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      const res = await fetch(url, options);
      const data = checkResponse(res);
      return data;
    }
  }
};

const getIngredients = (order) => async (dispatch) => {
  const res = await fetch(`${apiConfig.url}/ingredients`);
  const data = await res.json();
  const ingredientsArr = data.data;

  ingredientsArr.forEach((ingredientEl) => {
    order.forEach((orderEl) => {
      ingredientEl.amount = 0;
      if (orderEl._id === ingredientEl._id) {
        ingredientEl.amount = orderEl.amount;
      }
    });
  });
  dispatch({ type: GET_INGREDIENTS, data: ingredientsArr });
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

export const logInUser = (url, options) => async (dispatch) => {
  const data = await fetchWithRefresh(url, options);
  const authToken = data.accessToken.split("Bearer")[1];
  const refreshToken = data.refreshToken;

  dispatch(setUser(data.user, true));
  if (authToken) {
    setCookie("token", authToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const patchUser = (url, options) => async (dispatch) => {
  const data = await fetchWithRefresh(url, options);
  dispatch(setUser(data.user));
};

export const refreshUser = async (refreshToken) => {
  const res = await fetch(`${apiConfig.url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: `${refreshToken}` }),
  });
  return res;
};

export const checkUserAPI = (url, options) => async (dispatch) => {
  const { user } = await fetchWithRefresh(url, options);
  if (user) {
    dispatch(setUser(user, true));
  }
};

export const logOutUser = (url, options) => async (dispatch) => {
  const message = await fetchWithRefresh(url, options);
  if (message.success) {
    dispatch({ type: RESET_USER });
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
  }
};

export const resetPassword = (url, options) => async (dispatch) => {
  const res = await fetch(url, options);
  return res;
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

const setUser = (user, authenticated) => {
  return {
    type: SET_USER,
    user: user,
    authenticated: authenticated,
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
