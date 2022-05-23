import { useState, useEffect } from "react";
import { apiConfig, parseResponse } from "../API/api";
import styles from "./app.module.css";
import Header from "../header/Header";
import Modal from "../Modal/Modal";
import BurgerIngredients from "../Burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import OrderDetails from "../Order-details/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderContext from "../../services/orderContext";

function App() {
  const [ingredients, setIngridients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({ price: 0 });
  const [order, setOrder] = useState([{ price: 0 }]);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const handleIngredientClick = (ingredient) => {
    setIsIngredientsDetailsOpened(true);
    order.find((el) => el.type === "bun") && ingredient.type === "bun"
      ? console.log("duplicate")
      : setCurrentIngredient(ingredient);
  };

  const closeIngredientModal = () => {
    setIsIngredientsDetailsOpened(false);
  };

  const handleEscKeydownIngredientModal = (event) => {
    event.key === "Escape" && closeIngredientModal();
  };

  const closeOrderModal = () => {
    setOrderDetailsOpened(false);
  };

  const handleEscKeydownOrderModal = (event) => {
    event.key === "Escape" && closeOrderModal();
  };

  const handleOrderClick = () => {
    const orderInfo = order.map((ingredients) => ingredients._id);
    fetch("https://norma.nomoreparties.space/api/orders", {
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
        console.log(json);
        setOrderNumber(json.order.number);
        setOrderDetailsOpened(true);
      })
      .catch((er) => console.log(er));
  };

  const getIngredients = () => {
    fetch(`${apiConfig.url}`)
      .then(parseResponse)
      .then((json) => {
        setIngridients(json.data);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    setOrder([...order, currentIngredient]);
  }, [currentIngredient]);

  return (
    <>
      <Header />
      <OrderContext.Provider value={order}>
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
      </OrderContext.Provider>
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
