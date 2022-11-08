import { TTabsActions } from "../actions/tabs";
import { RESET_TAB_STATE, SET_TAB_STATE } from "../types";

type TActiveTabState = {
  constructor: boolean;
  orderFeed: boolean;
  profile: boolean;
};

const initialActiveState: TActiveTabState = {
  constructor: false,
  orderFeed: false,
  profile: false,
};

export const activeReducer = (
  state = initialActiveState,
  action: TTabsActions
) => {
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
