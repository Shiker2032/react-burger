import { apiConfig } from "../../components/API/api";
import { AppDispatch } from "../types/index";
import { AppThunk } from "../types/index";
import {
  ADD_INGREDIENT_PRICE,
  TIngredient,
  INCREMENT_INGREDIENT,
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  RESET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_INGREDIENTS,
  SUBTRACT_INGREDIENT_AMOUNT,
  SUBTRACT_INGREDIENT_PRICE,
} from "../types";

export type TCurrentIngredientActions = ISetCurrentIngredientAction;

interface ISubtractIngredientAction {
  type: typeof SUBTRACT_INGREDIENT_AMOUNT;
  ingredient: TIngredient;
}

interface IIncrementIngredientAction {
  type: typeof INCREMENT_INGREDIENT;
  ingredient: TIngredient;
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
  ingredient: TIngredient;
}

interface IReorderItemsAction {
  type: typeof REORDER_ITEMS;
  data: Array<TIngredient>;
}

interface ISetCurrentIngredientAction {
  type: typeof SET_CURRENT_INGREDIENT;
  currentIngredient: TIngredient;
}

interface IResetIngredientsAction {
  type: typeof RESET_INGREDIENTS;
}

interface ISetIngredientsAction {
  type: typeof SET_INGREDIENTS;
  data: Array<TIngredient>;
}

const setIngredients = (data: Array<TIngredient>): ISetIngredientsAction => ({
  type: SET_INGREDIENTS,
  data: data,
});

export const getIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
  const res = await fetch(`${apiConfig.url}/ingredients`);
  const data = await res.json();
  const ingredientsArr = data.data;
  dispatch(setIngredients(ingredientsArr));
};

export const setCurrentIngredient = (
  currentIngredient: TIngredient
): ISetCurrentIngredientAction => {
  return {
    type: SET_CURRENT_INGREDIENT,
    currentIngredient: currentIngredient,
  };
};

export const resetIngredients = (): IResetIngredientsAction => ({
  type: RESET_INGREDIENTS,
});

export const subtracIngredient = (
  ingredient: TIngredient
): ISubtractIngredientAction => ({
  type: SUBTRACT_INGREDIENT_AMOUNT,
  ingredient: ingredient,
});

export const incrementIngredient = (
  ingredient: TIngredient
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
  ingredient: TIngredient
): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient,
});

export const reorderItems = (
  newItems: Array<TIngredient>
): IReorderItemsAction => ({
  type: REORDER_ITEMS,
  data: newItems,
});

export type TIngredientActions =
  | ISetIngredientsAction
  | ISubtractIngredientAction
  | IIncrementIngredientAction
  | IAddIngredientPriceAction
  | ISubtractIngredientPriceAction
  | IRemoveIngredientAction
  | IReorderItemsAction
  | IResetIngredientsAction
  | ISetCurrentIngredientAction;
