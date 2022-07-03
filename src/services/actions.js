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

export const logInUser = (user) => (dispatch) => {
  fetch("https://norma.nomoreparties.space/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const authToken = data.accessToken.split("Bearer")[1];
        const refreshToken = data.refreshToken;
        dispatch(setUser(data.user, true));
        if (authToken) {
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      });
    }
  });
};

export const logOutUser = (refreshToken) => (dispatch) => {
  fetch("https://norma.nomoreparties.space/api/auth/logout", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ token: `${refreshToken}` }),
  }).then((res) => {
    parseResponse(res);
    if (res.ok) {
      dispatch({ type: "RESET_USER" });
      deleteCookie("token");
    }
  });
};

export const patchUser = (inputData) => (dispatch) => {
  fetch("https://norma.nomoreparties.space/api/auth/user", {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(inputData),
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        setUser(data.user, true);
      });
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
