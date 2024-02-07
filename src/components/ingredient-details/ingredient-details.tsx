import ingredientsSt2 from "./ingredient-details.module.css";
import { useMemo } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../utils/types";

function IngredientDetails() {
    const { ingredients } = useSelector((store: any) => store.ingredients);
    const { ingredientId } = useParams<{ ingredientId?: string }>();
    const ingredient = useMemo(
        () =>
            ingredients.find((item: TIngredient) => item._id === ingredientId),
        [ingredients, ingredientId]
    );
    return ingredient ? (
        <div className={ingredientsSt2.menu__item}>
            <div>
                <h2>Детали ингредиента</h2>
                <img src={ingredient.image_large} alt={ingredient.name} />
                <p className={ingredientsSt2.modal__name}>{ingredient.name}</p>
                <div className={ingredientsSt2.modal__properties}>
                    <div className={ingredientsSt2.modal__item}>
                        <p>Калории,ккал</p>
                        <span>{ingredient.calories}</span>
                    </div>
                    <div className={ingredientsSt2.modal__item}>
                        <p>Белки, г</p>
                        <span>{ingredient.proteins}</span>
                    </div>
                    <div className={ingredientsSt2.modal__item}>
                        <p>Жиры, г</p>
                        <span>{ingredient.fat}</span>
                    </div>
                    <div className={ingredientsSt2.modal__item}>
                        <p>Углеводы, г</p>
                        <span>{ingredient.carbohydrates}</span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <h3 className={ingredientsSt2.title}>
            Упс.. Такой ингредиент не найден
        </h3>
    );
}

export default IngredientDetails;
