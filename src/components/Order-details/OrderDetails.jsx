import React from "react";
import styles from "./orderDetails.module.css";

const OrderDetails = ({orderNumber}) => {
  return (
    <div className={`${styles.orderDetails} pt-30 pb-30`}>
      <h3 className="styles.orderDetails__title text text_type_digits-large">
        {orderNumber !==0 && orderNumber}
      </h3>
      <p className="text text_type_main-medium pt-8 pb-15">
        идентификатор заказа
      </p>
      <img
        className={styles.orderDetails__image}
        src={require("./images/order accpeted-popup-graphics.png")}
      />
      <p className="text text_type_main-default pt-15 pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
