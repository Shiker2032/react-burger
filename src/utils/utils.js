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
