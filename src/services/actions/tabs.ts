import { RESET_TAB_STATE, SET_TAB_STATE } from "../types";

interface IResetTabAction {
  type: typeof RESET_TAB_STATE;
}

interface ISetTabAction {
  type: typeof SET_TAB_STATE;
  name: string;
}

export const setTab = (name: string): ISetTabAction => ({
  type: SET_TAB_STATE,
  name: name,
});

export const resetTab = (): IResetTabAction => ({ type: RESET_TAB_STATE });

export type TTabsActions = ISetTabAction | IResetTabAction;
