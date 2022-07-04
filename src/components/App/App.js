import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useHistory, Link, Route, Switch, useLocation } from "react-router-dom";

import styles from "./app.module.css";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import BurgerIngredients from "../Burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../Burger-constructor/BurgerConstructor";
import OrderDetails from "../Order-details/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  getIngredients,
  logOutUser,
  postOrder,
  setCurrentIngredient,
  setUser,
} from "../../services/actions";
import { deleteCookie } from "../API/api";
import Ingredient from "../../pages/Ingredient";

function App(props) {
  useEffect(() => {
    dispatch(getIngredients());
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
      state: location,
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

  const logOutClick = () => {
    dispatch(setUser(null));
    dispatch(logOutUser(localStorage.getItem("refreshToken")));
    deleteCookie("token");
    localStorage.clear();
    history.replace({ pathname: "/login" });
  };

  return (
    <>
      <Header />

      <button onClick={logOutClick}>Выйти</button>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.app__flexComponents}>
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

export default App;
