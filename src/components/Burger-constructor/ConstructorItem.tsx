import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient, REORDER_ITEMS } from "../../services/types";
import styles from "./burgerConstructor.module.css";
import {
  removeIngredient,
  reorderItems,
  subtracIngredient,
  subtractIngredientPrice,
} from "../../services/actions/ingredient";
import { useSelectorHook } from "../../services/types/index";

type TConstructorItemProps = {
  ingredient: TIngredient;
  id: string;
  index: number;
};

const ConstructorItem: FC<TConstructorItemProps> = ({
  ingredient,
  id,
  index,
}) => {
  const order = useSelectorHook((store) => store.orderReducer.order);
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

  const moveElement = (dragIndex: number, hoverIndex: number) => {
    let newItems = [...order];
    let dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    newItems.filter((el) => el.price > 0);
    dispatch(reorderItems(newItems));
  };

  const [, drop] = useDrop({
    accept: "element",
    hover(item: { id: string; index: number }) {
      if (item.index === index) return;
      if (!ref.current) return;
      moveElement(item.index, index);
      item.index = index;
    },
  });

  const handleClose = (ingredient: TIngredient) => {
    if (ingredient.amount < 2) {
      dispatch(removeIngredient(ingredient));
      dispatch(subtractIngredientPrice(ingredient.price));
      dispatch(subtracIngredient(ingredient));
    } else {
      dispatch(subtracIngredient(ingredient));
      dispatch(subtractIngredientPrice(ingredient.price));
      dispatch(removeIngredient(ingredient));
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
};

export default ConstructorItem;
