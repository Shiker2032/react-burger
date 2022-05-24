import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
function ConstructorItem({ ingredient, type, isLocked, children }) {
  return (
    <ConstructorElement
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
