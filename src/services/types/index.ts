import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../store";
import { TIngredientActions } from "../actions/ingredient";
import { TTabsActions } from "../actions/tabs";
import { TWsActions } from "../actions/wsActions";
import { TOrderActions } from "../actions/order";

export type RootState = ReturnType<typeof store.getState>;

type TApplications =
  | TIngredientActions
  | TTabsActions
  | TWsActions
  | TOrderActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplications>
>;

export type AppDispatch = typeof store.dispatch;
