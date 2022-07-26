import styles from "./feedDetailsElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { getIngredient } from "../../../utils/utils";

function FeedDetailsElement({ ingredient }) {
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);
  return (
    <div className={styles.feedDetailsElement}>
      <div className={styles.feedDetailsElement__images}>
        <img
          className={styles.feedDetailsElement__image}
          src={ingredient && getIngredient(ingredient.id, ingredientsArr).image}
        />
        <p className="text text_type_main-default pb-6">
          {ingredient && getIngredient(ingredient.id, ingredientsArr).name}
        </p>
      </div>
      <div className={styles.feedDetailsElement__priceBlock}>
        <p className="text text_type_digits-default pr-2">
          {ingredient &&
            `${ingredient.amount} X ${
              getIngredient(ingredient.id, ingredientsArr).price
            }`}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default FeedDetailsElement;
