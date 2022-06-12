import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT } from "../../services/types";
function ConstructorItem({ ingredient, type, isLocked, children }) {
  const dispatch = useDispatch();
  return (
    <ConstructorElement
      handleClose={() => {
        dispatch({ type: REMOVE_INGREDIENT, ingredient: ingredient });
      }}
      type={type}
      isLocked={isLocked}
      text={
        children !== undefined
          ? ingredient.name + " " + children
          : ingredient.name
      }
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  );
}

ConstructorElement.propTypes = {
  ingredient: PropTypes.object,
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  children: PropTypes.element,
};

export default ConstructorItem;
