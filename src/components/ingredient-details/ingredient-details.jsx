import React from "react";
import ingredientsSt2 from "./ingredient-details.module.css";
import PropTypes from "prop-types";

function IngredientDetails(props) {
  const {cardId,data} = props
  

  return (
    <div className={ingredientsSt2.menu__item}>
            
            {data.map((card,index) => {
              if (card._id === cardId) {
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
              }
            })}
    </div>
  );
}
IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default IngredientDetails;