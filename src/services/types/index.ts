import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../store";
import { TIngredientActions } from "../actions/ingredient";
import { TTabsActions } from "../actions/tabs";
import { TWsActions } from "../actions/wsActions";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

export type TApplications =
  | TIngredientActions
  | TTabsActions
  | TWsActions
  | TOrderActions
  | TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplications>
>;
export type AppDispatch = typeof store.dispatch;

export const useDispatchHook = () => dispatchHook<AppDispatch & AppThunk>();

export const useSelectorHook: TypedUseSelectorHook<RootState> = selectorHook;
