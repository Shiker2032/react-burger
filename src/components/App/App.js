import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import BurgerIngredients from "../Burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../Burger-constructor/BurgerConstructor";
import OrderDetails from "../Order-details/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
  getIngredients,
  postOrder,
  setCurrentIngredient,
} from "../../services/actions";

function App(props) {
  const dispatch = useDispatch();

  const { currentIngredient, order, orderNumber } = useSelector(
    (store) => store
  );

  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const handleIngredientClick = (ingredient) => {
    setIsIngredientsDetailsOpened(true);
    dispatch(setCurrentIngredient(ingredient));
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
    console.log(orderInfo);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <Header />
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
