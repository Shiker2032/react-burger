import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useLocation } from "react-router-dom";

import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { getIngredients, logInUser } from "../services/actions";

function Ingredient(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const ingredients = useSelector(
    (store) => store.ingredientsReducer.ingredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const ingredient = ingredients.find((el) => el._id === params.id);

  return (
    <div>{ingredient && <IngredientDetails ingredient={ingredient} />}</div>
  );
}

export default Ingredient;
