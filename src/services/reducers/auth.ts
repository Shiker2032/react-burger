import { TUserActions } from "../actions/user";
import { RESET_USER, SET_USER, TUser } from "../types";

type TAuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  requestAttempt: number;
};

const initialAuthState: TAuthState = {
  user: null,
  isAuthenticated: false,
  requestAttempt: 0,
};

export const authReducer = (state = initialAuthState, action: TUserActions) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.authenticated,
      };
    }
    case RESET_USER: {
      return (state = initialAuthState);
    }
    default: {
      return state;
    }
  }
};
