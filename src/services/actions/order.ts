import { apiConfig, getCookie } from "../../components/API/api";
import { parseResponse } from "../../utils/utils";
import { AppDispatch } from "../types/index";
import { AppThunk } from "../types/index";
import {
  ADD_BUN_PRICE,
  IIngredient,
  RESET_INGREDIENT,
  RESET_ORDER,
  SET_BUN,
  SET_ORDER,
  SET_ORDER_NUMBER,
  SUBTRACT_BUN_AMOUNT,
} from "../types";
import { resetIngredients } from "./ingredient";

interface ISetOrderAction {
  type: typeof SET_ORDER;
  ingredient: IIngredient;
  uid: string;
}

interface ISetOrderNumberAction {
  type: typeof SET_ORDER_NUMBER;
  orderNumber: number;
}

interface IResetItemAction {
  type: typeof RESET_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
}

interface IResetOrderAction {
  type: typeof RESET_ORDER;
}

export type TOrderActions =
  | ISetOrderAction
  | ISetOrderNumberAction
  | IResetItemAction
  | IResetOrderAction;

export const postOrder: AppThunk =
  (orderInfo, modalHendler) => (dispatch: AppDispatch) => {
    try {
      fetch(`${apiConfig.url}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + getCookie("token"),
        },
        body: JSON.stringify({
          ingredients: orderInfo,
        }),
      })
        .then((res) => parseResponse(res))
        .then((json) => {
          dispatch(setOrderNumber(json.order.number));
          modalHendler(true);
          dispatch(resetOrder());
          dispatch(resetIngredients());
        })
        .catch((er) => console.log(er));
    } catch (err) {
      console.log(err);
    }
  };

export const resetOrder = (): IResetOrderAction => ({ type: RESET_ORDER });

export const setOrder = (
  ingredient: IIngredient,
  uid: string
): ISetOrderAction => {
  return {
    type: SET_ORDER,
    ingredient: ingredient,
    uid: uid,
  };
};

export const setOrderNumber = (number: number): ISetOrderNumberAction => {
  return {
    type: SET_ORDER_NUMBER,
    orderNumber: number,
  };
};

export const resetItem = (
  dragIndex: number,
  hoverIndex: number
): IResetItemAction => {
  return {
    type: RESET_INGREDIENT,
    dragIndex,
    hoverIndex,
  };
};
