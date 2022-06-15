import { useState, useEffect } from "react";
import { apiConfig, parseResponse } from "../API/api";
import styles from "./app.module.css";
import Header from "../header/Header";
import Modal from "../Modal/Modal";
import BurgerIngredients from "../Burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import OrderDetails from "../Order-details/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients,
  setCurrentIngredient,
  setOrder,
  setOrderNumber,
} from "../../services/actions";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(props) {
  const dispatch = useDispatch();

  const { ingredients, currentIngredient, order, orderNumber } = useSelector(
    (store) => store
  );

  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const handleIngredientClick = (ingredient) => {
    setIsIngredientsDetailsOpened(true);
    dispatch(setCurrentIngredient(ingredient));
    console.log(ingredient);
  };

  const closeIngredientModal = () => {
    setIsIngredientsDetailsOpened(false);
  };

  const handleEscKeydownIngredientModal = (event) => {
    event.key === "Escape" && closeIngredientModal();
  };

  const handleEscKeydownOrderModal = (event) => {
    event.key === "Escape" && closeOrderModal();
  };

  const closeOrderModal = () => {
    setOrderDetailsOpened(false);
  };

  const handleOrderClick = () => {
    const orderInfo = order
      .map((ingredients) => ingredients._id)
      .filter((el) => el !== undefined);

    fetch(`${apiConfig.url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: orderInfo,
      }),
    })
      .then(parseResponse)
      .then((json) => {      
        dispatch(setOrderNumber(json.order.number));
        setOrderDetailsOpened(true);
        dispatch({type: 'RESET_ORDER'})
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.app__flexComponents}>
          <BurgerIngredients
            ingredients={ingredients}
            onClick={handleIngredientClick}
          />
          <BurgerConstructor
            ingredients={ingredients}
            order={order}
            onClick={handleOrderClick}
          />
        </main>
      </DndProvider>

      {isIngredientsDetailsOpened && (
        <Modal
          onCloseClick={closeIngredientModal}
          onEsckeyDown={handleEscKeydownIngredientModal}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      {isOrderDetailsOpened && (
        <Modal
          onCloseClick={closeOrderModal}
          onEsckeyDown={handleEscKeydownOrderModal}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default App;
