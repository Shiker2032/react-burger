import styles from "./feedOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { getIngredient, calculateOrderTime } from "../../utils/utils";

function FeedOrder({ order, handleFeedClick }) {
  const ingredientsArr = useSelector((store) => store.ingredientsReducer);
  const orderIngredients = order.ingredients;

  const calculateOrderPrice = (orderArr) => {
    let price = 0;
    orderArr.ingredients.map((el_id) => {
      const ingredient = getIngredient(el_id, ingredientsArr);
      if (ingredient && ingredient.price !== undefined) {
        price += ingredient?.price;
      }
    });
    return price;
  };
  const leftOverIngredient = getIngredient(orderIngredients[6], ingredientsArr);

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        className={styles.order}
        onClick={() => handleFeedClick(order)}
      >
        <div className={styles.info}>
          <div className={styles.info__code}>
            <p className="text text_type_main-default">#</p>
            <p className="text text_type_digits-default">
              {order && order.number}
            </p>
          </div>
          <p className="text text_type_main-default pt-6 pb-6 text_color_inactive">
            {order && calculateOrderTime(order.createdAt)}
          </p>
        </div>
        <p className="text text_type_main-medium pb-6">{order && order.name}</p>

        <div className={styles.summary}>
          <div className={styles.summary__images}>
            {orderIngredients &&
              orderIngredients.map((ingredientEl, idx) => {
                if (idx < 5) {
                  return (
                    <li
                      style={{ zIndex: 10 - idx }}
                      key={uuidv4()}
                      className={styles.image__container}
                    >
                      <img
                        style={{}}
                        className={styles.summary__image}
                        src={getIngredient(ingredientEl, ingredientsArr)?.image}
                      />
                    </li>
                  );
                }
              })}
            {leftOverIngredient && (
              <li
                style={{ zIndex: 10 - 5 }}
                key={uuidv4()}
                className={styles.image__container}
              >
                <img
                  style={{ opacity: "0.6" }}
                  className={styles.summary__image}
                  src={
                    getIngredient(leftOverIngredient._id, ingredientsArr).image
                  }
                />

                <p className={styles.counter}>
                  + {orderIngredients.length - 6}
                </p>
              </li>
            )}
          </div>
          <div className={styles.summary__priceBlock}>
            <p className="text text_type_digits-default pr-2">
              {order && calculateOrderPrice(order)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedOrder;
