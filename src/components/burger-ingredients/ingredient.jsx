import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import ingredientsSt from "./burger-ingredients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import { ingredientsPropTypes } from "../../utils/types";
import { OPEN_MODAL_INGREDIENT } from "../../services/actions/ingredients";
import { Link, useLocation } from "react-router-dom";
function Ingredient(props) {
  const { _id, image, price, name } = props.ingredient;
  const ingredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  ).filter((item) => item._id === _id);
  const location = useLocation();
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

  return (
    <li ref={dragRef} className={ingredientsSt.menu__card}>
      <Link
        to={{
          // Тут мы формируем динамический путь для нашего ингредиента
          // а также сохраняем в свойство background роут, на котором была открыта наша модалка
          pathname: `/ingredients/${_id}`,
          state: { background: location },
        }}
      >
        {conditionCount && <Counter count={length} size="default" />}
        <img src={image} alt="" />
        <div className={ingredientsSt.menu__price}>
          {price} <CurrencyIcon type="primary" />
        </div>
        <div>{name}</div>
      </Link>
    </li>
  );
}
Ingredient.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  type: PropTypes.string.isRequired,
};
export default Ingredient;
