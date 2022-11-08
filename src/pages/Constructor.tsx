import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import OrderDetails from "../components/Order-details/OrderDetails";

import BurgerConstructor from "../components/Burger-constructor/BurgerConstructor";
import BurgerIngredients from "../components/Burger-ingredients/BurgerIngredients";
import styles from "./constructor.module.css";
import { postOrder } from "../services/actions/order";
import IngredientDetails from "./IngredientDetails";
import { setCurrentIngredient } from "../services/actions/ingredient";
import { resetTab, setTab } from "../services/actions/tabs";
import { useDispatchHook, useSelectorHook } from "../services/types/index";
import { TIngredient } from "../services/types";

function Constructor() {
  const { order, orderNumber, user } = useSelectorHook((store) => ({
    orderNumber: store.orderNumberReducer.orderNumber,
    order: store.orderReducer.order,
    currentIngredient: store.currentIngredientReducer.currentIngredient,
    user: store.authReducer.user,
  }));

  useEffect(() => {
    dispatch(resetTab());
    dispatch(setTab("constructor"));
  }, []);

  const dispatch = useDispatchHook();
  const history = useHistory();
  const location = useLocation();

  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const handleIngredientClick = (ingredient: TIngredient) => {
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
    if (!user) {
      history.replace({ pathname: "/login" });
    } else {
      const orderInfo = order
        .map((ingredients) => ingredients._id)
        .filter((el) => el !== undefined);
      dispatch(postOrder(orderInfo, setOrderDetailsOpened));
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.flexComponents}>
          <BurgerIngredients onClick={handleIngredientClick} />
          <BurgerConstructor onClick={handleOrderClick} />
        </main>
      </DndProvider>

      {isIngredientsDetailsOpened && (
        <Modal onCloseClick={handleCloseIngredientModal}>
          <IngredientDetails />
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
