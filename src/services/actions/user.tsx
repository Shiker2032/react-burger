import { RESET_USER, SET_USER, TUser } from "../types";
import {
  apiConfig,
  deleteCookie,
  getCookie,
  setCookie,
} from "../../components/API/api";
import { checkResponse } from "../../utils/utils";
import { AppThunk } from "../types/index";
import { AppDispatch } from "../types/index";

interface ISetUserAction {
  type: typeof SET_USER;
  user: TUser;
  authenticated: boolean;
}

interface IResetUserAction {
  type: typeof RESET_USER;
}

export const setUser = (
  user: TUser,
  authenticated: boolean
): ISetUserAction => {
  return {
    type: SET_USER,
    user: user,
    authenticated: authenticated,
  };
};
export const resetUser = (): IResetUserAction => ({ type: RESET_USER });

type TOptions = {
  body?: string;
  headers: any;
  method: string;
};

export type TUserActions = ISetUserAction | IResetUserAction;

const fetchWithRefresh = async (url: string, options: TOptions) => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse(res);
    return data;
  } catch (err) {
    if (err === "jwt expired") {
      const refreshRes = await refreshUser(localStorage.refreshToken!);
      const refreshData = await checkResponse(refreshRes!);
      setCookie("token", refreshData.accessToken!);
      localStorage.setItem("refreshToken", refreshData.refreshToken!);
      const res = await fetch(url, options);
      const data = checkResponse(res);
      return data;
    }
  }
};

export const logInUser = (user: TUser) => async (dispatch: AppDispatch) => {
  try {
    const data = await fetchWithRefresh(`${apiConfig.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (data !== undefined) {
      const authToken = data.accessToken!.split("Bearer")[1];
      const refreshToken = data.refreshToken;

      dispatch(setUser(data.user!, true));
      if (authToken) {
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken!);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const patchUser =
  (inputData: TUser) => async (dispatch: AppDispatch) => {
    try {
      const res = await fetchWithRefresh(`${apiConfig.url}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body: JSON.stringify(inputData),
      });
      if (res) {
        dispatch(setUser(res.user!, true));
      }
    } catch (err) {
      console.log(err);
    }
  };

export const refreshUser = async (refreshToken: string) => {
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

export const registerUser: AppThunk = (user: TUser) => async (dispatch) => {
  try {
    const res = await fetch(`${apiConfig.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const data = await checkResponse(res);
      dispatch(setUser(data.user!, true));
      setCookie("token", data.accessToken!);
      if (data !== undefined) {
        localStorage.setItem("refreshToken", data.refreshToken!);
      }
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkUserAPI: AppThunk = () => async (dispatch) => {
  try {
    const resp = await fetchWithRefresh(`${apiConfig.url}/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      method: "GET",
    });
    if (resp?.user) dispatch(setUser(resp.user, true));
  } catch (err) {
    console.log(err);
  }
};

export const logOutUser: AppThunk = () => async (dispatch) => {
  try {
    const message = await fetchWithRefresh(`${apiConfig.url}/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token: `${localStorage.refreshToken}` }),
    });
    if (message?.success) {
      dispatch(resetUser());
      deleteCookie("token");
      localStorage.removeItem("refreshToken");
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (inputData: {
  password: string;
  token: string;
}) => {
  try {
    const res = await fetch(`${apiConfig.url}/password-reset/reset`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + inputData.token,
      },
      method: "POST",
      body: JSON.stringify(inputData),
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (emailInput: string) => {
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
