import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  REMOVE_INGREDIENT,
  REORDER_ITEMS,
  SUBTRACT_INGREDIENT_AMOUNT,
  SUBTRACT_INGREDIENT_PRICE,
} from "../../services/types";
import styles from "./burgerConstructor.module.css";

function ConstructorItem({ ingredient, id, index }) {
  const order = useSelector((store) => store.order);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  const moveElement = (dragIndex, hoverIndex) => {
    let newItems = [...order];
    let dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    newItems.filter((el) => el.price > 0);
    dispatch({ type: REORDER_ITEMS, data: newItems });
  };

  const [, drop] = useDrop({
    accept: "element",
    hover(item) {
      if (item.index === index) return;
      if (!ref.current) return;
      moveElement(item.index, index);
      item.index = index;
    },
  });

  const handleClose = (ingredient) => {
    if (ingredient.amount < 2) {
      dispatch({ type: REMOVE_INGREDIENT, ingredient: ingredient });
      dispatch({ type: SUBTRACT_INGREDIENT_PRICE, price: ingredient.price });
      dispatch({ type: SUBTRACT_INGREDIENT_AMOUNT, ingredient: ingredient });
    } else {
      dispatch({ type: SUBTRACT_INGREDIENT_AMOUNT, ingredient: ingredient });
      dispatch({ type: SUBTRACT_INGREDIENT_PRICE, price: ingredient.price });
      dispatch({ type: REMOVE_INGREDIENT, ingredient: ingredient });
    }
  };

  drag(drop(ref));

  return (
    <article
      id={id}
      style={{ opacity: opacity }}
      ref={ref}
      className={styles.burgerConstructor__cardElement}
    >
      <p className={styles.burgerConstructor__dragIcon}>
        <DragIcon type="primary" />
      </p>
      <ConstructorElement
        handleClose={() => handleClose(ingredient)}
        type={""}
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </article>
  );
}

ConstructorElement.propTypes = {
  ingredient: PropTypes.object.isRequired,
  id: PropTypes.number,
  index: PropTypes.number,
};

export default ConstructorItem;
