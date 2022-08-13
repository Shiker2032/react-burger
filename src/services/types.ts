export const SET_INGREDIENTS: "SET_INGREDIENTS" = "SET_INGREDIENTS";
export const RESET_INGREDIENTS: "RESET_INGREDIENTS" = "RESET_INGREDIENTS";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";
export const RESET_INGREDIENT: "RESET_INGREDIENT" = "RESET_INGREDIENT";

export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" =
  "SET_CURRENT_INGREDIENT";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const SET_BUN: "SET_BUN" = "SET_BUN";

export const SET_ORDER_NUMBER: "SET_ORDER_NUMBER" = "SET_ORDER_NUMBER";
export const REORDER_ITEMS: "REORDER_ITEMS" = "REORDER_ITEMS";

export const SET_ORDER: "SET_ORDER" = "SET_ORDER";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

export const SUBTRACT_BUN_AMOUNT: "SUBTRACT_BUN_AMOUNT" = "SUBTRACT_BUN_AMOUNT";

export const INCREMENT_INGREDIENT: "INCREMENT_INGREDIENT" =
  "INCREMENT_INGREDIENT";

export const ADD_BUN_PRICE: "ADD_BUN_PRICE" = "ADD_BUN_PRICE";

export const ADD_INGREDIENT_PRICE: "ADD_INGREDIENT_PRICE" =
  "ADD_INGREDIENT_PRICE";

export const SUBTRACT_INGREDIENT_AMOUNT: "SUBTRACT_INGREDIENT_AMOUNT" =
  "SUBTRACT_INGREDIENT_AMOUNT";

export const SUBTRACT_INGREDIENT_PRICE: "SUBTRACT_INGREDIENT_PRICE" =
  "SUBTRACT_INGREDIENT_PRICE";

export const SET_USER: "SET_USER" = "SET_USER";
export const RESET_USER: "RESET_USER" = "RESET_USER";

export const SET_TAB_STATE: "SET_TAB_STATE" = "SET_TAB_STATE";
export const RESET_TAB_STATE: "RESET_TAB_STATE" = "RESET_TAB_STATE";

export interface IOrder {
  createdAt: Date;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: Date;
  _id: string;
}

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  amount: number;
  uid: any;
}

export type TUser = {
  email?: string;
  name?: string;
  password?: string;
};
