import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import ingredientsSt from "./burger-ingredients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientsPropTypes } from "../../utils/types";
import { openIngredientModal } from "../../services/actions/modal";

function Ingredient(props) {
  const { _id, image, price, name } = props.ingredient;
  const ingredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  ).filter((item) => item._id === _id);

  const currentBun = [
    useSelector((store) => store.ingredients.currentBun),
  ].filter((item) => item && item._id === _id);
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const conditionCount = ingredients.length > 0 || currentBun.length > 0;
  const length =
    props.ingredient.type !== "bun"
      ? ingredients.length
      : currentBun.length > 0
      ? 2
      : 0;
  const dispatch = useDispatch();

  return (
    <li
      ref={dragRef}
      onClick={() => dispatch(openIngredientModal(props.ingredient))}
      className={ingredientsSt.menu__card}
    >
      {conditionCount && <Counter count={length} size="default" />}
      <img src={image} alt="" />
      <div className={ingredientsSt.menu__price}>
        {price} <CurrencyIcon type="primary" />
      </div>
      <div>{name}</div>
    </li>
  );
}
Ingredient.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};
export default Ingredient;
