import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorItem({ ingredient, type, children }) {
  return (
    <ConstructorElement
      type={type}
      isLocked={true}
      text={
        children !==undefined ? children + ingredient.name : ingredient.name
      }
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  );
}

export default ConstructorItem;
