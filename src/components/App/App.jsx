import React from "react";
import styles from "./app.module.css";
import Header from "../header/Header";
import BurgerIngredients from "../Burger-ingridients/BurgerIngridients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../Order-details/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { apiConfig, parseResponse } from "../API/api";
import { useState, useEffect } from "react";

export const OrderContext = React.createContext();



function App() {

  const [orderNumber, setOrderNumber] = useState(0);
  
  const [state, setState] = useState([]);
  const [isIngredientsDetailsOpened, setIsIngredientsDetailsOpened] =
    useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({price: 0});
  const [order, setOrder] = useState([{price:0}]);

  const handleIngredientClick = (ingredient) => {
    setIsIngredientsDetailsOpened(true);
    if((order.find((el) => el.type === 'bun' )) && (ingredient.type === 'bun')) {
      console.log('dupblicate')
    }
    else {
      setCurrentIngredient(ingredient);
    
    }
  };

  useEffect(() => {
    setOrder([...order, currentIngredient]);
          
  }, [currentIngredient])

  const closeIngredientModal = () => {
    setIsIngredientsDetailsOpened(false);
  };

  const handleEscKeydownIngredientModal = (event) => {
    event.key === "Escape" && closeIngredientModal();
  };

  const handleOrderClick = () => {
    

    const orderInfo = order.map((ingredients) => ingredients._id);
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": [...orderInfo]
      })
    })
    .then(res => res.json())
    .then(json => {
      setOrderNumber(json.order.number);      
      setOrderDetailsOpened(true);
    });
    
  };

  const closeOrderModal = () => {
    setOrderDetailsOpened(false);
  };

  const handleEscKeydownOrderModal = (event) => {
    event.key === "Escape" && closeOrderModal();
  };

  function getState() {
    fetch(`${apiConfig.url}`)
      .then(parseResponse)
      .then((json) => {
        setState(json.data);
      })
      .catch((er) => console.log(er));
  }


  useEffect(() => {
    getState();
  }, []);

  return (        
    <>
      <Header />
      <OrderContext.Provider value={order}>
        <main className={styles.app__flexComponents}>
          <BurgerIngredients
            ingredients={state}
            onClick={handleIngredientClick}
          />
          <BurgerConstructor ingredients={state} order={order} onClick={handleOrderClick} />
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
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      )}
    </>
  );
}

export default App;
