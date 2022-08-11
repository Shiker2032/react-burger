import {
  ADD_BUN_PRICE,
  IIngredient,
  SET_BUN,
  SUBTRACT_BUN_AMOUNT,
} from "../types";

export const subtractBun = (bun: IIngredient): ISubtractBunAction => ({
  type: SUBTRACT_BUN_AMOUNT,
  bun: bun,
});

export const setBun = (ingredient: IIngredient): ISetBunAction => ({
  type: SET_BUN,
  ingredient: ingredient,
});

export const setBunPrice = (price: number): ISetBunPriceAction => ({
  type: ADD_BUN_PRICE,
  price: price,
});

interface ISubtractBunAction {
  type: typeof SUBTRACT_BUN_AMOUNT;
  bun: IIngredient;
}

interface ISetBunAction {
  type: typeof SET_BUN;
  ingredient: IIngredient;
}

interface ISetBunPriceAction {
  type: typeof ADD_BUN_PRICE;
  price: number;
}

export type TBunActions =
  | ISetBunAction
  | ISubtractBunAction
  | ISetBunPriceAction;
