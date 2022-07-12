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
  deleteCookie,
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

const checkResponse = async (res) => {
  const data = await res.json();
  return res.ok ? data : Promise.reject(data.message);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse(res);
    return data;
  } catch (err) {
    if (err === "jwt expired") {
      const refreshRes = await refreshUserAPI(localStorage.refreshToken);
      const refreshData = await checkResponse(refreshRes);

      setCookie("token", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);

      const res = await fetch(url, options);
      const data = await checkResponse(res);
      return data;
    }
  }
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

export const refreshUserAPI = async (refreshToken) => {
  const res = await fetch("https://norma.nomoreparties.space/api/auth/token", {
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
    dispatch({ type: "RESET_USER" });
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
  }
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
    type: "SET_USER",
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
