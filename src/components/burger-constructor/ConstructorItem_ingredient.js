import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_INGREDIENT, REORDER_ITEMS } from "../../services/types";
import styles from "./burgerConstructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
function ConstructorItem_ingredient({ ingredient, id, index }) {
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

  function moveElement(dragIndex, hoverIndex) {
    let newItems = [...order];
    let dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    newItems.filter((el) => el.price > 0);
    dispatch({ type: REORDER_ITEMS, data: newItems });
  }

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
      console.log(order);
    }
    dispatch({ type: "SUBTRACT_INGREDIENT_AMOUNT", ingredient: ingredient });
    dispatch({ type: "SUBTRACT_INGREDIENT_PRICE", price: ingredient.price });
  };

  drag(drop(ref));

  return (
    <article
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
  ingredient: PropTypes.object,
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  children: PropTypes.element,
};

export default ConstructorItem_ingredient;
