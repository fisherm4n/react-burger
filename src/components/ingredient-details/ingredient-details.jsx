import ingredientsSt2 from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function IngredientDetails(props) {
  const { cardId } = props;
  const { ingredients } = useSelector((store) => store.ingredients);

  return (
    <div className={ingredientsSt2.menu__item}>
      {ingredients
        .filter((card) => card._id === cardId)
        .map((card, index) => {
          return (
            <div key={index}>
              <h2>Детали ингредиента</h2>
              <img src={card.image_large} alt={card.name} />
              <p className={ingredientsSt2.modal__name}>{card.name}</p>
              <div className={ingredientsSt2.modal__properties}>
                <div className={ingredientsSt2.modal__item}>
                  <p>Калории,ккал</p>
                  <span>{card.calories}</span>
                </div>
                <div className={ingredientsSt2.modal__item}>
                  <p>Белки, г</p>
                  <span>{card.proteins}</span>
                </div>
                <div className={ingredientsSt2.modal__item}>
                  <p>Жиры, г</p>
                  <span>{card.fat}</span>
                </div>
                <div className={ingredientsSt2.modal__item}>
                  <p>Углеводы, г</p>
                  <span>{card.carbohydrates}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
IngredientDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};
export default IngredientDetails;
