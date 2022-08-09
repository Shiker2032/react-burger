import { apiConfig } from "../../components/API/api";
import {
  ADD_BUN_PRICE,
  ADD_INGREDIENT_PRICE,
  GET_INGREDIENTS,
  IIngredient,
  INCREMENT_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  SET_BUN,
  SET_CURRENT_INGREDIENT,
  SUBTRACT_BUN_AMOUNT,
  SUBTRACT_INGREDIENT_AMOUNT,
  SUBTRACT_INGREDIENT_PRICE,
} from "../types";
//union
export type TCurrentIngredientActions = ISetCurrentIngredientAction;

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

interface ISubtractIngredientAction {
  type: typeof SUBTRACT_INGREDIENT_AMOUNT;
  ingredient: IIngredient;
}

interface IIncrementIngredientAction {
  type: typeof INCREMENT_INGREDIENT;
  ingredient: IIngredient;
}

interface IAddIngredientPriceAction {
  type: typeof ADD_INGREDIENT_PRICE;
  price: number;
}

interface ISubtractIngredientPriceAction {
  type: typeof SUBTRACT_INGREDIENT_PRICE;
  price: number;
}

interface IRemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  ingredient: IIngredient;
}

interface IReorderItemsAction {
  type: typeof REORDER_ITEMS;
  data: Array<IIngredient>;
}

export const getIngredients = () => async (dispatch: any) => {
  const res = await fetch(`${apiConfig.url}/ingredients`);
  const data = await res.json();
  const ingredientsArr = data.data;
  dispatch({ type: GET_INGREDIENTS, data: ingredientsArr });
};

interface ISetCurrentIngredientAction {
  type: typeof SET_CURRENT_INGREDIENT;
  currentIngredient: any;
}

export const setCurrentIngredient = (
  currentIngredient: any
): ISetCurrentIngredientAction => {
  return {
    type: SET_CURRENT_INGREDIENT,
    currentIngredient: currentIngredient,
  };
};

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

export const subtracIngredient = (
  ingredient: IIngredient
): ISubtractIngredientAction => ({
  type: SUBTRACT_INGREDIENT_AMOUNT,
  ingredient: ingredient,
});

export const incrementIngredient = (
  ingredient: IIngredient
): IIncrementIngredientAction => ({
  type: INCREMENT_INGREDIENT,
  ingredient: ingredient,
});

export const addIngredientPrice = (
  price: number
): IAddIngredientPriceAction => ({
  type: ADD_INGREDIENT_PRICE,
  price: price,
});

export const subtractIngredientPrice = (
  price: number
): ISubtractIngredientPriceAction => ({
  type: SUBTRACT_INGREDIENT_PRICE,
  price: price,
});
export const removeIngredient = (
  ingredient: IIngredient
): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient,
});

export const reorderItems = (
  newItems: Array<IIngredient>
): IReorderItemsAction => ({
  type: REORDER_ITEMS,
  data: newItems,
});
