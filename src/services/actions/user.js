import { RESET_USER, SET_USER } from "../types";
import {
  apiConfig,
  deleteCookie,
  getCookie,
  setCookie,
} from "../../components/API/api.js";
import { checkResponse } from "../../utils/utils";

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

export const logInUser = (user) => async (dispatch) => {
  try {
    const data = await fetchWithRefresh(`${apiConfig.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const authToken = data.accessToken.split("Bearer")[1];
    const refreshToken = data.refreshToken;

    dispatch(setUser(data.user, true));
    if (authToken) {
      setCookie("token", authToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  } catch (err) {
    console.log(err);
  }
};

export const patchUser = (inputData) => async (dispatch) => {
  try {
    const res = await fetchWithRefresh(`${apiConfig.url}/auth/user`, {
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
    });
    dispatch(setUser(res.user));
  } catch (err) {
    console.log(err);
  }
};

export const refreshUser = async (refreshToken) => {
  try {
    const res = await fetch(`${apiConfig.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: `${refreshToken}` }),
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const res = await fetch(`${apiConfig.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await checkResponse(res);
    if (res.ok) {
      dispatch(setUser(data.user, true));
      setCookie(data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const checkUserAPI = () => async (dispatch) => {
  try {
    const { user } = await fetchWithRefresh(`${apiConfig.url}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + getCookie("token"),
      },
      method: "GET",
    });
    if (user) dispatch(setUser(user, true));
  } catch (err) {
    console.log(err);
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    const message = await fetchWithRefresh(`${apiConfig.url}/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token: `${localStorage.refreshToken}` }),
    });
    if (message?.success) {
      dispatch({ type: RESET_USER });
      deleteCookie("token");
      localStorage.removeItem("refreshToken");
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (inputData) => {
  try {
    const res = await fetch(`${apiConfig.url}/password-reset/reset`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + inputData.token,
      },
      method: "POST",
      body: JSON.stringify(inputData),
    });
    const data = await checkResponse(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (emailInput) => {
  try {
    const res = await fetch(`${apiConfig.url}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
      }),
    });
    const data = await checkResponse(res);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const setUser = (user, authenticated) => {
  return {
    type: SET_USER,
    user: user,
    authenticated: authenticated,
  };
};
