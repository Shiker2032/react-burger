export const checkResponse = async (res) => {
  const data = await res.json();
  return res.ok ? data : Promise.reject(data.message);
};

export const parseResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

export const getIngredient = (id, ingredientsArr) => {
  return ingredientsArr?.ingredients.find((el) => el._id === id);
};

export const calculateOrderTime = (order) => {
  const date = new Date(order.createdAt);
  const dateNow = new Date(Date.now());
  let difference = Math.floor((dateNow - date) / (24 * 3600 * 1000));
  if (difference === 0) {
    difference = "Сегодня";
  } else if (difference === 1) {
    difference = "Вчера";
  } else {
    difference = difference.toString() + " дня назад";
  }

  const time = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;

  const dateString = `${difference}, ${time} i-GMT+3`;
  return dateString;
};
