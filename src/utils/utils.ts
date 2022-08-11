import { TUser } from "../services/types";
import { IIngredient } from "../services/types";

type TData = {
  success: boolean;
  accessToken?: string;
  user: TUser;
  refreshToken: string;
  message: string;
};

export const checkResponse = async (res: Response) => {
  const data: TData = await res.json();
  return res.ok ? data : Promise.reject(data.message);
};

export const parseResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

interface IOrder {
  ingredients: Array<IIngredient>;
}

export const getIngredient = (id: string, ingredientsArr: IOrder) => {
  if (ingredientsArr) {
    const { ingredients } = ingredientsArr;
    return ingredients.find((el) => el._id === id);
  }
};

export const calculateOrderTime = (createdAt: Date) => {
  const date = new Date(createdAt);
  const dateNow = new Date(Date.now()).valueOf();
  let dateString: string = "";
  let difference: number = Math.floor(
    (dateNow - date.valueOf()) / (24 * 3600 * 1000)
  );

  if (difference === 0) {
    dateString = "Сегодня";
  } else if (difference === 1) {
    dateString = "Вчера";
  } else {
    dateString = difference.toString() + " дня назад";
  }

  const time = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;

  return `${dateString}, ${time} i-GMT+3`;
};
