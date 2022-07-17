import { RESET_TAB_STATE, SET_TAB_STATE } from "../types";

const initialActiveState = {
  constructor: false,
  orderFeed: false,
  profile: false,
};

export const activeReducer = (state = initialActiveState, action) => {
  switch (action.type) {
    case SET_TAB_STATE: {
      return { ...state, [action.name]: true };
    }
    case RESET_TAB_STATE: {
      return (state = initialActiveState);
    }
    default:
      return state;
  }
};
