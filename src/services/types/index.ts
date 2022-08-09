import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;

type TApplications = any;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplications>
>;

export type AppDispatch = typeof store.dispatch;
