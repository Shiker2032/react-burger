import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import OrderDetails from "../components/Order-details/OrderDetails";

import BurgerConstructor from "../components/Burger-constructor/BurgerConstructor";
import BurgerIngredients from "../components/Burger-ingredients/BurgerIngredients";
import Header from "../components/Header/Header";
import styles from "./constructor.module.css";
import {
  logOutUser,
  postOrder,
  setCurrentIngredient,
  setUser,
  getIngredients,
} from "../services/actions";
import { deleteCookie } from "../components/API/api";
import IngredientDetails from "./IngredientDetails";

function Constructor(props) {
  useEffect(() => {
    dispatch(getIngredients());
    dispatch({ type: "RESET_TAB_STATE" });
    dispatch({
      type: "SET_TAB_STATE",
      name: "constructor",
    });
  }, []);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { currentIngredient, order, orderNumber } = useSelector((store) => ({
    orderNumber: store.orderNumberReducer.orderNumber,
    order: store.orderReducer.order,
    currentIngredient: store.currentIngredientReducer.currentIngredient,
  }));

  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const handleIngredientClick = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    history.replace({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: location },
    });
  };

  const handleCloseIngredientModal = () => {
    setIsIngredientsDetailsOpened(false);
  };

  const closeOrderModal = () => {
    setOrderDetailsOpened(false);
  };

  const handleOrderClick = () => {
    const orderInfo = order
      .map((ingredients) => ingredients._id)
      .filter((el) => el !== undefined);
    dispatch(postOrder(orderInfo, setOrderDetailsOpened));
  };

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.flexComponents}>
          <BurgerIngredients onClick={handleIngredientClick} />
          <BurgerConstructor order={order} onClick={handleOrderClick} />
        </main>
      </DndProvider>

      {isIngredientsDetailsOpened && (
        <Modal onCloseClick={handleCloseIngredientModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      {isOrderDetailsOpened && (
        <Modal onCloseClick={closeOrderModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default Constructor;
