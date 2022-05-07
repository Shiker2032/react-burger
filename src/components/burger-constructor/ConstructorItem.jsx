import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorItem({ ingredient, type }) {
  return (
    <ConstructorElement
      type={type}
      isLocked={true}
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  );
}

export default ConstructorItem;
