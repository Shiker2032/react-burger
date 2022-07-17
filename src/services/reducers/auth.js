import { RESET_USER, SET_USER } from "../types";

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  requestAttempt: 0,
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.authenticated,
      };
    }
    case RESET_USER: {
      state = initialAuthState;
    }
    default: {
      return state;
    }
  }
};
